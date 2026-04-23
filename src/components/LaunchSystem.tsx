import { useState, useRef, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store/useStore'
import componentsData from '../data/components.json'
import ComponentBriefing from './ComponentBriefing'

// Build Starship stack geometry using Three.js primitives
function StarshipStack({ onSelect }: { onSelect: (id: string) => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  
  // Rotate slowly when idle
  useFrame((_, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  const handleClick = useCallback((id: string) => {
    onSelect(id)
  }, [onSelect])

  const handlePointerOver = useCallback((id: string) => {
    setHovered(id)
    document.body.style.cursor = 'pointer'
  }, [])

  const handlePointerOut = useCallback(() => {
    setHovered(null)
    document.body.style.cursor = 'default'
  }, [])

  const emissiveColor = hovered ? '#ffffff' : '#444444'

  return (
    <group ref={groupRef}>
      {/* === SHIP SECTION === */}
      
      {/* Ship Nosecone */}
      <mesh 
        position={[0, 18.5, 0]}
        onClick={() => handleClick('ship-nosecone')}
        onPointerOver={() => handlePointerOver('ship-nosecone')}
        onPointerOut={handlePointerOut}
      >
        <coneGeometry args={[1.5, 5, 16]} />
        <meshStandardMaterial 
          color="#888888" 
          emissive={emissiveColor}
          emissiveIntensity={hovered === 'ship-nosecone' ? 0.5 : 0.1}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Ship Main Body */}
      <mesh 
        position={[0, 12, 0]}
        onClick={() => handleClick('ship')}
        onPointerOver={() => handlePointerOver('ship')}
        onPointerOut={handlePointerOut}
      >
        <cylinderGeometry args={[1.5, 1.5, 12, 16]} />
        <meshStandardMaterial 
          color="#999999"
          emissive={emissiveColor}
          emissiveIntensity={hovered === 'ship' ? 0.5 : 0.1}
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>

      {/* Ship Heat Shield (base of ship) */}
      <mesh 
        position={[0, 5.8, 0]}
        onClick={() => handleClick('ship-heatshield')}
        onPointerOver={() => handlePointerOver('ship-heatshield')}
        onPointerOut={handlePointerOut}
      >
        <cylinderGeometry args={[1.6, 1.5, 0.8, 16]} />
        <meshStandardMaterial 
          color="#666666"
          emissive={emissiveColor}
          emissiveIntensity={hovered === 'ship-heatshield' ? 0.5 : 0.1}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Ship Flaps (4x) - Forward pair */}
      <mesh position={[1.8, 10, 0]} rotation={[0, 0, Math.PI / 8]} onClick={() => handleClick('ship-flap-forward')} onPointerOver={() => handlePointerOver('ship-flap-forward')} onPointerOut={handlePointerOut}>
        <boxGeometry args={[0.1, 2.5, 1.2]} />
        <meshStandardMaterial color="#777777" emissive={emissiveColor} emissiveIntensity={hovered === 'ship-flap-forward' ? 0.5 : 0.1} />
      </mesh>
      <mesh position={[-1.8, 10, 0]} rotation={[0, 0, -Math.PI / 8]} onClick={() => handleClick('ship-flap-forward')} onPointerOver={() => handlePointerOver('ship-flap-forward')} onPointerOut={handlePointerOut}>
        <boxGeometry args={[0.1, 2.5, 1.2]} />
        <meshStandardMaterial color="#777777" emissive={emissiveColor} emissiveIntensity={hovered === 'ship-flap-forward' ? 0.5 : 0.1} />
      </mesh>

      {/* Ship Flaps (4x) - Aft pair */}
      <mesh position={[1.8, 7, 0]} rotation={[0, 0, Math.PI / 6]} onClick={() => handleClick('ship-flap-forward')} onPointerOver={() => handlePointerOver('ship-flap-forward')} onPointerOut={handlePointerOut}>
        <boxGeometry args={[0.1, 2.0, 1.0]} />
        <meshStandardMaterial color="#777777" emissive={emissiveColor} emissiveIntensity={hovered === 'ship-flap-forward' ? 0.5 : 0.1} />
      </mesh>
      <mesh position={[-1.8, 7, 0]} rotation={[0, 0, -Math.PI / 6]} onClick={() => handleClick('ship-flap-forward')} onPointerOver={() => handlePointerOver('ship-flap-forward')} onPointerOut={handlePointerOut}>
        <boxGeometry args={[0.1, 2.0, 1.0]} />
        <meshStandardMaterial color="#777777" emissive={emissiveColor} emissiveIntensity={hovered === 'ship-flap-forward' ? 0.5 : 0.1} />
      </mesh>

      {/* Ship Engine Section */}
      <mesh position={[0, 4.5, 0]} onClick={() => handleClick('ship-engine-section')} onPointerOver={() => handlePointerOver('ship-engine-section')} onPointerOut={handlePointerOut}>
        <cylinderGeometry args={[1.4, 1.5, 1.5, 16]} />
        <meshStandardMaterial color="#555555" emissive={emissiveColor} emissiveIntensity={hovered === 'ship-engine-section' ? 0.5 : 0.1} metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Raptor Vacuum Engines (6x on ship) */}
      {[
        [0, 0, 0],
        [0.7, 0, 0.7],
        [-0.7, 0, 0.7],
        [0.7, 0, -0.7],
        [-0.7, 0, -0.7],
        [0, 0, 0]
      ].map((pos, i) => (
        <mesh 
          key={`vac-engine-${i}`}
          position={[pos[0], 3.2, pos[2]]}
          onClick={() => handleClick('raptor-vac')}
          onPointerOver={() => handlePointerOver('raptor-vac')}
          onPointerOut={handlePointerOut}
        >
          <cylinderGeometry args={[0.15, 0.25, 1.2, 8]} />
          <meshStandardMaterial color="#444444" emissive={emissiveColor} emissiveIntensity={hovered === 'raptor-vac' ? 0.6 : 0.15} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* === HOT STAGE RING === */}
      <mesh position={[0, 2.5, 0]} onClick={() => handleClick('hotstage')} onPointerOver={() => handlePointerOver('hotstage')} onPointerOut={handlePointerOut}>
        <torusGeometry args={[1.5, 0.15, 8, 24]} />
        <meshStandardMaterial color="#333333" emissive={emissiveColor} emissiveIntensity={hovered === 'hotstage' ? 0.5 : 0.1} />
      </mesh>

      {/* === INTERSTAGE === */}
      <mesh position={[0, 1.5, 0]} onClick={() => handleClick('interstage')} onPointerOver={() => handlePointerOver('interstage')} onPointerOut={handlePointerOut}>
        <cylinderGeometry args={[1.45, 1.5, 1.5, 16]} />
        <meshStandardMaterial color="#666666" emissive={emissiveColor} emissiveIntensity={hovered === 'interstage' ? 0.5 : 0.1} metalness={0.8} roughness={0.4} />
      </mesh>

      {/* === BOOSTER SECTION === */}

      {/* Booster Main Body */}
      <mesh position={[0, -10, 0]} onClick={() => handleClick('booster')} onPointerOver={() => handlePointerOver('booster')} onPointerOut={handlePointerOut}>
        <cylinderGeometry args={[1.5, 1.5, 22, 16]} />
        <meshStandardMaterial color="#888888" emissive={emissiveColor} emissiveIntensity={hovered === 'booster' ? 0.5 : 0.1} metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Grid Fins (4x) */}
      {[
        { pos: [2.2, 2, 0], rot: [0, 0, Math.PI / 12] },
        { pos: [-2.2, 2, 0], rot: [0, 0, -Math.PI / 12] },
        { pos: [0, 2, 2.2], rot: [Math.PI / 12, 0, 0] },
        { pos: [0, 2, -2.2], rot: [-Math.PI / 12, 0, 0] }
      ].map((fin, i) => (
        <mesh 
          key={`grid-fin-${i}`}
          position={fin.pos as [number, number, number]}
          rotation={fin.rot as [number, number, number]}
          onClick={() => handleClick('booster-gridfin')}
          onPointerOver={() => handlePointerOver('booster-gridfin')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[0.1, 2.5, 1.5]} />
          <meshStandardMaterial color="#666666" emissive={emissiveColor} emissiveIntensity={hovered === 'booster-gridfin' ? 0.5 : 0.1} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Booster Engine Section */}
      <mesh position={[0, -22.5, 0]} onClick={() => handleClick('booster-engine-section')} onPointerOver={() => handlePointerOver('booster-engine-section')} onPointerOut={handlePointerOut}>
        <cylinderGeometry args={[1.5, 1.3, 3, 16]} />
        <meshStandardMaterial color="#444444" emissive={emissiveColor} emissiveIntensity={hovered === 'booster-engine-section' ? 0.5 : 0.1} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Raptor Sea Level Engines (33 cluster - simplified to 19 visible) */}
      {[
        // Inner ring - 7 engines
        ...[0, 1, 2, 3, 4, 5, 6].map(i => {
          const angle = (i / 7) * Math.PI * 2
          return [Math.cos(angle) * 0.5, -24.5, Math.sin(angle) * 0.5] as [number, number, number]
        }),
        // Outer ring - 12 engines
        ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
          const angle = (i / 12) * Math.PI * 2 + 0.15
          return [Math.cos(angle) * 1.0, -24.5, Math.sin(angle) * 1.0] as [number, number, number]
        })
      ].map((pos, i) => (
        <mesh 
          key={`sl-engine-${i}`}
          position={pos}
          onClick={() => handleClick('raptor-sl')}
          onPointerOver={() => handlePointerOver('raptor-sl')}
          onPointerOut={handlePointerOut}
        >
          <cylinderGeometry args={[0.12, 0.2, 1.0, 8]} />
          <meshStandardMaterial color="#333333" emissive={emissiveColor} emissiveIntensity={hovered === 'raptor-sl' ? 0.6 : 0.15} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* === LAUNCH TOWER (simplified) === */}
      <group position={[4, -5, 0]}>
        {/* Tower body */}
        <mesh onClick={() => handleClick('launch-tower')} onPointerOver={() => handlePointerOver('launch-tower')} onPointerOut={handlePointerOut}>
          <boxGeometry args={[0.4, 45, 0.4]} />
          <meshStandardMaterial color="#555555" emissive={emissiveColor} emissiveIntensity={hovered === 'launch-tower' ? 0.5 : 0.1} />
        </mesh>
        {/* Chopsticks arm */}
        <mesh position={[0, 15, 2]} onClick={() => handleClick('mechazilla')} onPointerOver={() => handlePointerOver('mechazilla')} onPointerOut={handlePointerOut}>
          <boxGeometry args={[0.3, 0.3, 4]} />
          <meshStandardMaterial color="#666666" emissive={emissiveColor} emissiveIntensity={hovered === 'mechazilla' ? 0.5 : 0.1} />
        </mesh>
        <mesh position={[0, 15, -2]} onClick={() => handleClick('mechazilla')} onPointerOver={() => handlePointerOver('mechazilla')} onPointerOut={handlePointerOut}>
          <boxGeometry args={[0.3, 0.3, 4]} />
          <meshStandardMaterial color="#666666" emissive={emissiveColor} emissiveIntensity={hovered === 'mechazilla' ? 0.5 : 0.1} />
        </mesh>
      </group>
    </group>
  )
}

function StarshipScene({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 10]} intensity={1} />
      <directionalLight position={[-10, 10, -10]} intensity={0.5} />
      <pointLight position={[0, 30, 0]} intensity={0.5} />
      
      <StarshipStack onSelect={onSelect} />
      
      <OrbitControls 
        enablePan={false}
        minDistance={20}
        maxDistance={80}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

export default function LaunchSystem() {
  const { selectedComponent, setSelectedComponent } = useStore()

  const handleSelect = (id: string) => {
    setSelectedComponent(id === selectedComponent ? null : id)
  }

  const handleClose = () => {
    setSelectedComponent(null)
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      position: 'relative',
      background: '#000'
    }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [15, 5, 15], fov: 45 }}
        style={{ flex: 1, background: '#000' }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 60, 120]} />
        <StarshipScene onSelect={handleSelect} />
      </Canvas>

      {/* Component Briefing Panel */}
      {selectedComponent && (
        <ComponentBriefing 
          componentId={selectedComponent} 
          onClose={handleClose} 
        />
      )}

      {/* Instructions overlay */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        fontFamily: 'Space Mono, monospace',
        fontSize: '10px',
        color: '#6a6a6a',
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        DRAG TO ROTATE • SCROLL TO ZOOM • CLICK PARTS TO INSPECT
      </div>

      {/* Selection indicator */}
      {selectedComponent && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '10px',
          color: '#ffffff',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          padding: '8px 16px',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '4px',
          background: 'rgba(0,0,0,0.6)'
        }}>
          ⬡ {selectedComponent.replace(/-/g, ' ').toUpperCase()} SELECTED
        </div>
      )}
    </div>
  )
}