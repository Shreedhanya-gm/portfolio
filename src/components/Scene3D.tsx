import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

function Orb({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!animate) return;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [animate]);

  useFrame((s, dt) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += dt * 0.18;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, mouse.current.y * 0.35, 3, dt);
    g.position.x = THREE.MathUtils.damp(g.position.x, mouse.current.x * 0.3, 3, dt);
    g.position.y = Math.sin(s.clock.elapsedTime * 0.8) * 0.1;
  });

  return (
    <group ref={group} rotation={[0.4, 0.5, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshPhysicalMaterial color="#c9c5d6" metalness={1} roughness={0.22} clearcoat={0.6} flatShading />
      </mesh>
      <mesh scale={1.45}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export default function Scene3D({ visible, reduceMotion }: { visible: boolean; reduceMotion: boolean }) {
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  useEffect(() => {
    const h = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', h);
    return () => document.removeEventListener('visibilitychange', h);
  }, []);
  const running = visible && tabVisible && !reduceMotion;

  return (
    <Canvas
      frameloop={running ? 'always' : 'demand'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 2]} intensity={1.2} />
      <Orb animate={!reduceMotion} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} position={[0, 4, -4]} scale={[10, 2, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={3} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#a78bfa" />
        <Lightformer form="ring" intensity={2} position={[4, -2, 3]} scale={3} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
