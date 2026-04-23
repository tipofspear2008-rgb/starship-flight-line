import { useStore } from '../store/useStore'
import componentsData from '../data/components.json'

interface ComponentBriefingProps {
  componentId: string
  onClose: () => void
}

export default function ComponentBriefing({ componentId, onClose }: ComponentBriefingProps) {
  const { activeTab } = useStore()
  
  const components = (componentsData as any).components || []
  const component = components.find((c: any) => c.id === componentId)
  
  if (!component) {
    return null
  }

  return (
    <div style={{
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '380px',
      background: 'rgba(10, 10, 10, 0.92)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideIn 0.25s ease',
      zIndex: 100
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6a6a6a',
            textTransform: 'uppercase',
            marginBottom: '6px'
          }}>
            Component Briefing
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '18px',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '1px',
            margin: 0
          }}>
            {component.name}
          </h2>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            color: '#6a6a6a',
            letterSpacing: '2px',
            marginTop: '4px'
          }}>
            {component.shortName} • {component.category.toUpperCase()}
          </div>
        </div>
        <button 
          onClick={onClose}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#6a6a6a',
            width: '28px',
            height: '28px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s'
          }}
        >
          ×
        </button>
      </div>

      {/* Animated divider */}
      <div style={{
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        animation: 'shimmer 2s infinite'
      }} />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        
        {/* Role */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6a6a6a',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            Role
          </div>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '12px',
            color: '#d0d0d0',
            lineHeight: 1.7,
            margin: 0
          }}>
            {component.role}
          </p>
        </div>

        {/* Key Facts */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6a6a6a',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Key Facts
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)'
          }}>
            {component.keyFacts.map((fact: any, i: number) => (
              <div 
                key={i}
                style={{
                  background: 'rgba(15,15,15,0.95)',
                  padding: '12px'
                }}
              >
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '2px',
                  color: '#6a6a6a',
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}>
                  {fact.label}
                </div>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why It Matters */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6a6a6a',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            Why It Matters
          </div>
          <p style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            color: '#9a9a9a',
            lineHeight: 1.7,
            margin: 0,
            padding: '14px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            {component.whyItMatters}
          </p>
        </div>

        {/* Status */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6a6a6a',
            textTransform: 'uppercase',
            marginBottom: '8px'
          }}>
            Status
          </div>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            color: '#10b981',
            padding: '10px 14px',
            background: 'rgba(16,185,129,0.08)',
            borderRadius: '6px',
            border: '1px solid rgba(16,185,129,0.2)'
          }}>
            {component.status}
          </div>
        </div>

        {/* Sources */}
        <div>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6a6a6a',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Sources
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {component.sources.map((source: any, i: number) => (
              <div 
                key={i}
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  color: '#6a6a6a',
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ color: '#3a3a3a' }}>→</span>
                <span>{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}