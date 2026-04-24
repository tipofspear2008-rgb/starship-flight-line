import { useState, useRef, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store/useStore'
import missionsData from '../data/missions.json'
import { Mission } from '../data/types'

// Earth globe component
function EarthGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[20, 64, 64]} />
      <meshStandardMaterial 
        color={(0x1a1a1a)}
        wireframe={false}
        metalness={0.1}
        roughness={0.9}
      />
    </mesh>
  )
}

// Launch point marker
function LaunchMarker({ lat, lon }: { lat: number; lon: number }) {
  const latRad = (lat * Math.PI) / 180
  const lonRad = (lon * Math.PI) / 180
  
  const x = -20 * Math.cos(latRad) * Math.cos(lonRad)
  const y = 20 * Math.sin(latRad)
  const z = 20 * Math.cos(latRad) * Math.sin(lonRad)
  
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial 
        color={0x10b981}
        emissive={0x10b981}
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

// Flight path arc
function FlightPath({ mission }: { mission: Mission }) {
  const { launchLat, launchLon, splashdownLat, splashdownLon } = mission.flightPath
  
  if (!launchLat || !launchLon || !splashdownLat || !splashdownLon) return null
  
  // Create arc points
  const points: THREE.Vector3[] = []
  const steps = 50
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    // Great circle interpolation
    const lat1 = (launchLat * Math.PI) / 180
    const lon1 = (launchLon * Math.PI) / 180
    const lat2 = (splashdownLat * Math.PI) / 180
    const lon2 = (splashdownLon * Math.PI) / 180
    
    // Simple arc interpolation with altitude
    const lat = lat1 + (lat2 - lat1) * t
    const lon = lon1 + (lon2 - lon1) * t
    
    // Arc height - peak at midpoint
    const arcHeight = Math.sin(t * Math.PI) * 8
    
    const x = -(20 + arcHeight) * Math.cos(lat) * Math.cos(lon)
    const y = (20 + arcHeight) * Math.sin(lat)
    const z = (20 + arcHeight) * Math.cos(lat) * Math.sin(lon)
    
    points.push(new THREE.Vector3(x, y, z))
  }
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={0xffffff} transparent opacity={0.6} />
    </line>
  )
}

// Globe scene
function GlobeScene({ selectedMission }: { selectedMission: Mission | null }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={0.8} />
      
      <EarthGlobe />
      
      {selectedMission && selectedMission.flightPath.launchLat && selectedMission.flightPath.launchLon && (
        <>
          <LaunchMarker 
            lat={selectedMission.flightPath.launchLat} 
            lon={selectedMission.flightPath.launchLon} 
          />
          <FlightPath mission={selectedMission} />
          
          {selectedMission.flightPath.splashdownLat && selectedMission.flightPath.splashdownLon && (
            <mesh 
              position={[
                -20 * Math.cos((selectedMission.flightPath.splashdownLat * Math.PI) / 180) * Math.cos((selectedMission.flightPath.splashdownLon * Math.PI) / 180),
                20 * Math.sin((selectedMission.flightPath.splashdownLat * Math.PI) / 180),
                20 * Math.cos((selectedMission.flightPath.splashdownLat * Math.PI) / 180) * Math.sin((selectedMission.flightPath.splashdownLon * Math.PI) / 180)
              ]}
            >
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial 
                color={0x6366f1}
                emissive={0x6366f1}
                emissiveIntensity={0.5}
              />
            </mesh>
          )}
        </>
      )}
      
      <OrbitControls 
        enablePan={false}
        minDistance={25}
        maxDistance={60}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

export default function FlightTracker() {
  const { selectedMission, setSelectedMission, flightPlaying, setFlightPlaying, flightProgress, setFlightProgress, flightSpeed, setFlightSpeed } = useStore()
  
  const missions = missionsData as Mission[]
  const [showInfo, setShowInfo] = useState(false)
  
  const handleMissionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mission = missions.find(m => m.id === e.target.value)
    setSelectedMission(mission?.id || null)
    setFlightPlaying(false)
    setFlightProgress(0)
    setShowInfo(false)
  }
  
  const selected = missions.find(m => m.id === selectedMission)
  
  const togglePlayback = () => {
    setFlightPlaying(!flightPlaying)
  }
  
  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlightProgress(parseFloat(e.target.value))
    setFlightPlaying(false)
  }
  
  const speeds = [0.25, 0.5, 1, 2, 5]
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      background: '#000',
      position: 'relative'
    }}>
      {/* 3D Globe */}
      <Canvas
        camera={{ position: [0, 0, 40], fov: 50 }}
        style={{ flex: 1 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach='background' args={['#050505']} />
        <GlobeScene selectedMission={selected || null} />
      </Canvas>

      {/* Controls Panel */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px 24px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        {/* Mission Selector */}
        <div style={{ width: '280px' }}>
          <select 
            className='select'
            value={selectedMission || ''}
            onChange={handleMissionSelect}
            style={{ 
              background: 'rgba(10,10,10,0.9)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            <option value=''>SELECT MISSION...</option>
            {missions.map(m => (
              <option key={m.id} value={m.id}>{m.shortName} — {m.dateText}</option>
            ))}
          </select>
        </div>

        {selected && (
          <>
            {/* Play/Pause */}
            <button 
              onClick={togglePlayback}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.3)',
                background: flightPlaying ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: '#fff',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {flightPlaying ? '❚❚' : '▶'}
            </button>

            {/* Timeline scrubber */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontFamily: 'Space Mono', fontSize: '10px', color: '#6a6a6a', minWidth: '40px' }}>
                {Math.round(flightProgress * 100)}%
              </span>
              <input 
                type='range' 
                min='0' 
                max='1' 
                step='0.01'
                value={flightProgress}
                onChange={handleScrub}
                style={{ 
                  flex: 1, 
                  height: '4px',
                  appearance: 'none',
                  background: `linear-gradient(90deg, #fff ${flightProgress * 100}%, #333 ${flightProgress * 100}%)`,
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ fontFamily: 'Space Mono', fontSize: '10px', color: '#6a6a6a', minWidth: '40px' }}>
                {flightPlaying ? 'PLAYING' : 'PAUSED'}
              </span>
            </div>

            {/* Speed control */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {speeds.map(s => (
                <button
                  key={s}
                  onClick={() => setFlightSpeed(s)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '10px',
                    background: flightSpeed === s ? 'rgba(255,255,255,0.15)' : 'transparent',
                    border: `1px solid ${flightSpeed === s ? '#fff' : '#333'}`,
                    color: flightSpeed === s ? '#fff' : '#6a6a6a',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'Space Mono'
                  }}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Info toggle */}
            <button 
              onClick={() => setShowInfo(!showInfo)}
              style={{
                padding: '8px 16px',
                fontSize: '10px',
                background: showInfo ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'Orbitron',
                letterSpacing: '2px'
              }}
            >
              MISSION BRIEF
            </button>
          </>
        )}
      </div>

      {/* Mission Info Panel */}
      {showInfo && selected && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 80,
          width: '400px',
          background: 'rgba(8,8,8,0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          padding: '24px',
          overflow: 'auto',
          animation: 'slideIn 0.25s ease'
        }}>
          <div style={{
            fontFamily: 'Orbitron',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6a6a6a',
            marginBottom: '8px'
          }}>
            MISSION BRIEFING
          </div>
          <h2 style={{
            fontFamily: 'Orbitron',
            fontSize: '22px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '4px'
          }}>
            {selected.displayName}
          </h2>
          <div style={{
            fontFamily: 'Space Mono',
            fontSize: '11px',
            color: '#6a6a6a',
            marginBottom: '20px'
          }}>
            {selected.dateText} • {selected.launchSite}
          </div>

          <div style={{
            padding: '14px',
            background: 'rgba(16,185,129,0.06)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '9px', letterSpacing: '2px', color: '#10b981', marginBottom: '4px' }}>OUTCOME</div>
            <div style={{ fontFamily: 'Space Mono', fontSize: '12px', color: '#d0d0d0' }}>{selected.outcome}</div>
          </div>

          <div style={{ fontFamily: 'Space Mono', fontSize: '11px', color: '#9a9a9a', lineHeight: 1.7, marginBottom: '20px' }}>
            {selected.summary}
          </div>

          <div style={{
            fontFamily: 'Orbitron',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6a6a6a',
            marginBottom: '12px'
          }}>
            KEY EVENTS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selected.keyEvents.map((evt, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '12px',
                padding: '10px 12px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '4px',
                borderLeft: `2px solid ${evt.type === 'launch' ? '#10b981' : evt.type === 'milestone' ? '#6366f1' : '#6a6a6a'}`
              }}>
                <span style={{ fontFamily: 'Space Mono', fontSize: '10px', color: '#6a6a6a', minWidth: '50px' }}>{evt.time}</span>
                <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color: '#d0d0d0' }}>{evt.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        input[type=range]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}