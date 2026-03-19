import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingServerRack = ({ position, rotation, scale = 1 }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
            <boxGeometry args={[1, 3, 1]} />
            <meshStandardMaterial 
                color="#0a100a" 
                roughness={0.8} 
                metalness={0.5} 
                emissive="#003300"
                emissiveIntensity={0.1}
            />
            {/* Blinking server lights on the front */}
            <mesh position={[0, 1, 0.51]}>
                <boxGeometry args={[0.1, 0.05, 0.01]} />
                <meshBasicMaterial color="#00ff00" />
            </mesh>
            <mesh position={[0, 0, 0.51]}>
                <boxGeometry args={[0.1, 0.05, 0.01]} />
                <meshBasicMaterial color="#00cc00" />
            </mesh>
            <mesh position={[0, -1, 0.51]}>
                <boxGeometry args={[0.1, 0.05, 0.01]} />
                <meshBasicMaterial color="#00aa00" />
            </mesh>
        </mesh>
    );
};

const CyberWorkspace = () => {
    return (
        <group>
            {/* Ambient Base Light */}
            <ambientLight intensity={0.1} color="#00ff00" />
            
            {/* Dramatic Spotlight from top right */}
            <spotLight 
                position={[5, 8, 5]} 
                angle={0.5} 
                penumbra={1} 
                intensity={1.5} 
                color="#00ff00" 
                castShadow 
            />

            {/* Subtle blue fill light from below */}
            <pointLight position={[-5, -5, -5]} color="#0055ff" intensity={0.3} />

            {/* Floor Plane (Dark metal grid concept) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#020502" roughness={0.9} metalness={0.1} />
            </mesh>

            {/* Abstract Server / Mainframe blocks */}
            <FloatingServerRack position={[-4, 0, -4]} rotation={[0, Math.PI / 4, 0]} scale={2} />
            <FloatingServerRack position={[5, -1, -6]} rotation={[0, -Math.PI / 6, 0]} scale={1.5} />
            <FloatingServerRack position={[-2, -2, -8]} rotation={[0, 0, 0]} scale={3} />
            
            {/* Heavy Glass panel reflecting screen */}
            <mesh position={[0, 0, -3]} rotation={[0, 0, 0]}>
                <planeGeometry args={[12, 8]} />
                <MeshTransmissionMaterial 
                    backside
                    thickness={0.5}
                    ior={1.2}
                    chromaticAberration={0.05}
                    transmission={0.9}
                    opacity={0.1}
                    roughness={0.3}
                />
            </mesh>

            <fog attach="fog" args={['#010301', 5, 20]} />
        </group>
    );
};

const Background = () => {
    return (
        <div className="fixed inset-0 w-full h-full z-[-10] bg-[#020502]">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} shadows>
                <CyberWorkspace />
                {/* Environment map to give realistic reflections to metal/glass */}
                <Environment preset="night" />
            </Canvas>
        </div>
    );
};

export default Background;
