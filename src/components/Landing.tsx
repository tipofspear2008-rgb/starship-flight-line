import { useStore } from '../store/useStore'

export default function Landing() {
  const { setActiveTab } = useStore()

  return (
    <div className="landing">
      <div className="landing-bg" />
      
      <div className="landing-content">
        <div className="landing-badge">⬡ SYSTEM INITIALIZED</div>
        
        <h1 className="landing-title">STARSHIP<br/>FLIGHT LINE</h1>
        
        <p className="landing-subtitle">Tony‑Stark Grade Briefing Console</p>
        
        <div className="landing-divider" />
        
        <p className="landing-desc">
          A fully offline desktop application for the Starship Launch System. 
          Explore interactive 3D component breakdowns and replay Starship flight tests 
          on a real-time 3D globe — no internet required.
        </p>
        
        <div className="module-cards">
          <div 
            className="module-card" 
            onClick={() => setActiveTab('launch-system')}
          >
            <span className="module-card-icon">🚀</span>
            <div className="module-card-label">Launch System</div>
            <div className="module-card-desc">
              Interactive 3D model. Click any component to reveal briefing, specs, and source data.
            </div>
            <span className="module-card-arrow">→</span>
          </div>
          
          <div 
            className="module-card" 
            onClick={() => setActiveTab('flight-tracker')}
          >
            <span className="module-card-icon">🌍</span>
            <div className="module-card-label">Flight Tracker</div>
            <div className="module-card-desc">
              3D globe replay of Starship flight tests. Select mission, play path, explore coordinates.
            </div>
            <span className="module-card-arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  )
}
