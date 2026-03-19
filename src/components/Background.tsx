import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
                roughness={0.9} 
                metalness={0.2} 
                emissive="#002200"
                emissiveIntensity={0.2}
            />
            {/* Blinking server lights on the front */}
            <mesh position={[0, 1, 0.51]}>
                <boxGeometry args={[0.1, 0.05, 0.01]} />
                <meshBasicMaterial color="#00ff00" />
            </mesh>
            <mesh position={[0, 0, 0.51]}>
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
            <ambientLight intensity={0.2} color="#00ff00" />
            
            {/* Standard lights, NO SHADOWS for performance */}
            <spotLight 
                position={[5, 8, 5]} 
                angle={0.8} 
                penumbra={1} 
                intensity={1.0} 
                color="#00ff00" 
            />

            {/* Subtle blue fill light from below */}
            <pointLight position={[-5, -5, -5]} color="#0055ff" intensity={0.2} />

            {/* Floor Plane (Dark metal grid concept) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#020402" roughness={1} metalness={0} />
            </mesh>

            {/* Abstract Server / Mainframe blocks */}
            <FloatingServerRack position={[-4, 0, -4]} rotation={[0, Math.PI / 4, 0]} scale={2} />
            <FloatingServerRack position={[5, -1, -6]} rotation={[0, -Math.PI / 6, 0]} scale={1.5} />
            <FloatingServerRack position={[-2, -2, -8]} rotation={[0, 0, 0]} scale={3} />

            <fog attach="fog" args={['#020502', 5, 20]} />
        </group>
    );
};

const Background = () => {
    return (
        <div className="fixed inset-0 w-full h-full z-[-10] bg-[#020502]">
            {/* Disabled shadows and environment to reduce GPU load */}
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <CyberWorkspace />
            </Canvas>
        </div>
    );
};

export default Background;
