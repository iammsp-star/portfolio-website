import { useEffect, useRef, useState, useCallback } from 'react';

// Grid: 20 cols × 7 rows — same dimensions as the contribution graph
const COLS = 20;
const ROWS = 7;
const CELL = 18; // px per cell
const SPEED = 120; // ms per step

type Dir = 'RIGHT' | 'LEFT' | 'UP' | 'DOWN';

interface Pos { x: number; y: number; }
interface Ghost { pos: Pos; dir: Dir; color: string; scared: boolean; }

const GHOST_COLORS = ['#ff6b6b', '#ffb347', '#87ceeb', '#dda0dd'];

const wrap = (v: number, max: number) => ((v % max) + max) % max;

const randomDir = (): Dir => (['RIGHT', 'LEFT', 'UP', 'DOWN'] as Dir[])[Math.floor(Math.random() * 4)];

// Generate a grid of "pellets" matching contribution-graph density
const makePellets = (): boolean[][] =>
    Array.from({ length: ROWS }, () =>
        Array.from({ length: COLS }, () => Math.random() > 0.15)
    );

// Make power pellets at corners
const POWER_CELLS: Pos[] = [
    { x: 0, y: 0 }, { x: COLS - 1, y: 0 },
    { x: 0, y: ROWS - 1 }, { x: COLS - 1, y: ROWS - 1 },
];

const isPower = (x: number, y: number) =>
    POWER_CELLS.some(p => p.x === x && p.y === y);

const initGhosts = (): Ghost[] =>
    GHOST_COLORS.map((color, i) => ({
        pos: { x: 5 + i * 3, y: 3 },
        dir: randomDir(),
        color,
        scared: false,
    }));

export const PacmanGame = () => {
    const [playing, setPlaying] = useState(false);
    const [pellets, setPellets] = useState<boolean[][]>(makePellets);
    const [pacPos, setPacPos] = useState<Pos>({ x: 10, y: 3 });
    const [pacDir, setPacDir] = useState<Dir>('RIGHT');
    const [nextDir, setNextDir] = useState<Dir>('RIGHT');
    const [mouthOpen, setMouthOpen] = useState(true);
    const [ghosts, setGhosts] = useState<Ghost[]>(initGhosts());
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [scared, setScared] = useState(false);
    const [scaredTimer, setScaredTimer] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    const stateRef = useRef({ pacPos, pacDir, nextDir, pellets, ghosts, score, lives, scared, scaredTimer, gameOver, won });
    stateRef.current = { pacPos, pacDir, nextDir, pellets, ghosts, score, lives, scared, scaredTimer, gameOver, won };

    const reset = useCallback(() => {
        setPellets(makePellets());
        setPacPos({ x: 10, y: 3 });
        setPacDir('RIGHT');
        setNextDir('RIGHT');
        setGhosts(initGhosts());
        setScore(0);
        setLives(3);
        setScared(false);
        setScaredTimer(0);
        setGameOver(false);
        setWon(false);
    }, []);

    // Keyboard controls
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const map: Record<string, Dir> = {
                ArrowRight: 'RIGHT', ArrowLeft: 'LEFT',
                ArrowUp: 'UP', ArrowDown: 'DOWN',
                d: 'RIGHT', a: 'LEFT', w: 'UP', s: 'DOWN',
            };
            if (map[e.key]) {
                e.preventDefault();
                setNextDir(map[e.key]);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    // Game loop
    useEffect(() => {
        if (!playing) return;

        const interval = setInterval(() => {
            const s = stateRef.current;
            if (s.gameOver || s.won) return;

            // Toggle mouth
            setMouthOpen(v => !v);

            // Move pacman
            const dirVec: Record<Dir, Pos> = {
                RIGHT: { x: 1, y: 0 }, LEFT: { x: -1, y: 0 },
                UP: { x: 0, y: -1 }, DOWN: { x: 0, y: 1 },
            };
            const tryMove = (dir: Dir, from: Pos): Pos => ({
                x: wrap(from.x + dirVec[dir].x, COLS),
                y: wrap(from.y + dirVec[dir].y, ROWS),
            });

            let newDir = s.nextDir;
            let newPos = tryMove(newDir, s.pacPos);
            // If next direction is blocked (nothing to block in this open grid), just move
            // We'll try nextDir first, fall back to current
            if (newPos.x === s.pacPos.x && newPos.y === s.pacPos.y) {
                newDir = s.pacDir;
                newPos = tryMove(newDir, s.pacPos);
            }

            setPacDir(newDir);
            setPacPos(newPos);

            // Eat pellet
            let addScore = 0;
            const newPellets = s.pellets.map((row, ry) =>
                row.map((has, cx) => {
                    if (has && cx === newPos.x && ry === newPos.y) {
                        addScore += isPower(cx, ry) ? 50 : 10;
                        return false;
                    }
                    return has;
                })
            );
            setPellets(newPellets);

            if (addScore > 0) {
                setScore(sc => sc + addScore);
            }

            // Power pellet eaten
            if (isPower(newPos.x, newPos.y) && s.pellets[newPos.y]?.[newPos.x]) {
                setScared(true);
                setScaredTimer(8);
                setGhosts(gs => gs.map(g => ({ ...g, scared: true })));
            }

            // Scared timer countdown
            if (s.scared && s.scaredTimer > 0) {
                setScaredTimer(t => {
                    if (t <= 1) {
                        setScared(false);
                        setGhosts(gs => gs.map(g => ({ ...g, scared: false })));
                        return 0;
                    }
                    return t - 1;
                });
            }

            // Move ghosts
            setGhosts(gs =>
                gs.map(ghost => {
                    const { pos, dir } = ghost;
                    const tryGhostDir = (d: Dir): Pos => ({
                        x: wrap(pos.x + dirVec[d].x, COLS),
                        y: wrap(pos.y + dirVec[d].y, ROWS),
                    });

                    // Randomly change direction occasionally
                    let newGhostDir = Math.random() < 0.25 ? randomDir() : dir;

                    // Chase or flee
                    if (!ghost.scared) {
                        // Try to move towards pacman
                        const dx = newPos.x - pos.x;
                        const dy = newPos.y - pos.y;
                        if (Math.random() < 0.5) {
                            newGhostDir = Math.abs(dx) > Math.abs(dy)
                                ? (dx > 0 ? 'RIGHT' : 'LEFT')
                                : (dy > 0 ? 'DOWN' : 'UP');
                        }
                    } else {
                        // Flee — move away
                        const dx = newPos.x - pos.x;
                        const dy = newPos.y - pos.y;
                        if (Math.random() < 0.6) {
                            newGhostDir = Math.abs(dx) > Math.abs(dy)
                                ? (dx > 0 ? 'LEFT' : 'RIGHT')
                                : (dy > 0 ? 'UP' : 'DOWN');
                        }
                    }

                    return {
                        ...ghost,
                        pos: tryGhostDir(newGhostDir),
                        dir: newGhostDir,
                    };
                })
            );

            // Check ghost collision
            const hitGhost = s.ghosts.find(g =>
                (Math.abs(g.pos.x - newPos.x) <= 1 && Math.abs(g.pos.y - newPos.y) <= 1) &&
                g.pos.x === newPos.x && g.pos.y === newPos.y
            );
            if (hitGhost) {
                if (hitGhost.scared) {
                    // Eat ghost
                    setScore(sc => sc + 200);
                    setGhosts(gs => gs.map(g => g === hitGhost ? { ...g, pos: { x: 10, y: 3 } } : g));
                } else {
                    const newLives = s.lives - 1;
                    setLives(newLives);
                    if (newLives <= 0) {
                        setGameOver(true);
                    } else {
                        setPacPos({ x: 10, y: 3 });
                        setGhosts(initGhosts());
                    }
                }
            }

            // Win condition
            const allEaten = newPellets.every(row => row.every(c => !c));
            if (allEaten) setWon(true);
        }, SPEED);

        return () => clearInterval(interval);
    }, [playing]);

    // Pac-Man SVG mouth arc
    const pacAngle = mouthOpen ? 40 : 5;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const r = CELL / 2 - 2;
    const cx = CELL / 2;
    const cy = CELL / 2;

    const dirRotation: Record<Dir, number> = { RIGHT: 0, DOWN: 90, LEFT: 180, UP: 270 };
    const rot = dirRotation[pacDir];

    const mouthPath = (() => {
        const startAngle = toRad(pacAngle);
        const endAngle = toRad(360 - pacAngle);
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2} Z`;
    })();


    const [cellColors] = useState<string[][]>(() =>
        Array.from({ length: ROWS }, (_, y) =>
            Array.from({ length: COLS }, (_, x) =>
                isPower(x, y) ? '#00ff41' :
                    Math.random() > 0.55 ? '#00ff41' :
                        Math.random() > 0.35 ? 'rgba(0,255,65,0.5)' : 'rgba(0,255,65,0.25)'
            )
        )
    );

    const totalWidth = COLS * CELL + (COLS - 1) * 2;
    const totalHeight = ROWS * CELL + (ROWS - 1) * 2;

    return (
        <div className="flex flex-col items-start gap-2 select-none">
            <div className="flex items-center justify-between w-full mb-1">
                <h4 className="terminal-text text-sm font-bold text-primary">CONTRIBUTIONS</h4>
                {playing && (
                    <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-secondary">SC:{score}</span>
                        <span className="flex gap-0.5">
                            {Array.from({ length: lives }).map((_, i) => (
                                <span key={i} className="text-primary">♥</span>
                            ))}
                        </span>
                    </div>
                )}
            </div>

            {/* SVG Canvas */}
            <div className="relative" style={{ width: totalWidth, height: totalHeight }}>
                <svg
                    width={totalWidth}
                    height={totalHeight}
                    style={{ display: 'block' }}
                    className="cursor-pointer"
                    onClick={() => { if (!playing) { reset(); setPlaying(true); } }}
                >
                    {/* Contribution cells */}
                    {pellets.map((row, ry) =>
                        row.map((has, cx_) => {
                            const sx = cx_ * (CELL + 2);
                            const sy = ry * (CELL + 2);
                            const isPow = isPower(cx_, ry);
                            const baseColor = cellColors[ry][cx_];
                            return (
                                <g key={`${cx_}-${ry}`}>
                                    <rect
                                        x={sx}
                                        y={sy}
                                        width={CELL}
                                        height={CELL}
                                        rx={3}
                                        fill={has ? baseColor : '#1a2a1a'}
                                        style={{ transition: 'fill 0.1s' }}
                                    />
                                    {/* Power pellet glow */}
                                    {has && isPow && (
                                        <circle
                                            cx={sx + CELL / 2}
                                            cy={sy + CELL / 2}
                                            r={3}
                                            fill="#00ff41"
                                            opacity={0.9}
                                        >
                                            <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
                                        </circle>
                                    )}
                                </g>
                            );
                        })
                    )}

                    {/* Ghosts */}
                    {playing && ghosts.map((ghost, gi) => {
                        const gx = ghost.pos.x * (CELL + 2);
                        const gy = ghost.pos.y * (CELL + 2);
                        const gc = CELL / 2;
                        const gr = CELL / 2 - 1;
                        const ghostColor = ghost.scared ? (scaredTimer < 3 ? '#ffffff' : '#1199ff') : ghost.color;
                        return (
                            <g key={gi} transform={`translate(${gx}, ${gy})`}>
                                {/* Ghost body */}
                                <path
                                    d={`M ${gc - gr} ${CELL - 2}
                                        L ${gc - gr} ${gc}
                                        A ${gr} ${gr} 0 0 1 ${gc + gr} ${gc}
                                        L ${gc + gr} ${CELL - 2}
                                        Q ${gc + gr * 0.5} ${CELL + 3} ${gc} ${CELL - 2}
                                        Q ${gc - gr * 0.5} ${CELL + 3} ${gc - gr} ${CELL - 2} Z`}
                                    fill={ghostColor}
                                    opacity={0.9}
                                />
                                {/* Eyes */}
                                {!ghost.scared && (
                                    <>
                                        <circle cx={gc - 3} cy={gc - 1} r={2.5} fill="white" />
                                        <circle cx={gc + 3} cy={gc - 1} r={2.5} fill="white" />
                                        <circle cx={gc - 2.5} cy={gc - 0.5} r={1.2} fill="#222" />
                                        <circle cx={gc + 3.5} cy={gc - 0.5} r={1.2} fill="#222" />
                                    </>
                                )}
                                {ghost.scared && (
                                    <path
                                        d={`M ${gc - 4} ${gc + 2} Q ${gc - 2} ${gc} ${gc} ${gc + 2} Q ${gc + 2} ${gc + 4} ${gc + 4} ${gc + 2}`}
                                        stroke="white" strokeWidth={1.5} fill="none"
                                    />
                                )}
                            </g>
                        );
                    })}

                    {/* Pac-Man */}
                    {playing && (() => {
                        const px = pacPos.x * (CELL + 2);
                        const py = pacPos.y * (CELL + 2);
                        return (
                            <g transform={`translate(${px}, ${py}) rotate(${rot}, ${CELL / 2}, ${CELL / 2})`}>
                                <path d={mouthPath} fill="#FFD700" />
                                {/* Eye */}
                                <circle
                                    cx={CELL / 2 + 1}
                                    cy={CELL / 2 - 4}
                                    r={1.2}
                                    fill="#222"
                                    transform={`rotate(-${rot}, ${CELL / 2 + 1}, ${CELL / 2 - 4})`}
                                />
                            </g>
                        );
                    })()}

                    {/* Overlay: not playing */}
                    {!playing && !gameOver && !won && (
                        <g>
                            <rect x={0} y={0} width={totalWidth} height={totalHeight} fill="rgba(0,0,0,0.55)" rx={4} />
                            <text x={totalWidth / 2} y={totalHeight / 2 - 8} textAnchor="middle" fill="#00ff41" fontSize={11} fontFamily="monospace" fontWeight="bold">
                                CLICK TO PLAY
                            </text>
                            <text x={totalWidth / 2} y={totalHeight / 2 + 8} textAnchor="middle" fill="rgba(0,255,65,0.5)" fontSize={9} fontFamily="monospace">
                                ← → ↑ ↓ or WASD
                            </text>
                        </g>
                    )}

                    {/* Game Over */}
                    {(gameOver || won) && (
                        <g>
                            <rect x={0} y={0} width={totalWidth} height={totalHeight} fill="rgba(0,0,0,0.7)" rx={4} />
                            <text x={totalWidth / 2} y={totalHeight / 2 - 10} textAnchor="middle"
                                fill={won ? '#00ff41' : '#ff6b6b'} fontSize={12} fontFamily="monospace" fontWeight="bold">
                                {won ? 'YOU WIN!' : 'GAME OVER'}
                            </text>
                            <text x={totalWidth / 2} y={totalHeight / 2 + 5} textAnchor="middle"
                                fill="rgba(0,255,65,0.7)" fontSize={9} fontFamily="monospace">
                                SCORE: {score}
                            </text>
                            <text x={totalWidth / 2} y={totalHeight / 2 + 18} textAnchor="middle"
                                fill="rgba(0,255,65,0.5)" fontSize={9} fontFamily="monospace"
                                style={{ cursor: 'pointer' }}
                                onClick={() => { reset(); setPlaying(true); }}>
                                [ CLICK TO RETRY ]
                            </text>
                        </g>
                    )}
                </svg>
            </div>

            <div className="text-xs text-slate-500 font-mono">
                {playing ? `${score} pts · eat all dots to win` : '648 contributions in the last year'}
            </div>
        </div>
    );
};

export default PacmanGame;
