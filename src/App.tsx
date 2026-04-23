import { useStore, TabType } from './store/useStore'
import TitleBar from './components/TitleBar'
import Landing from './components/Landing'
import LaunchSystem from './components/LaunchSystem'
import FlightTracker from './components/FlightTracker'

const tabs: { id: TabType; label: string }[] = [
  { id: 'launch-system', label: 'Launch System' },
  { id: 'flight-tracker', label: 'Flight Tracker' },
]

export default function App() {
  const { activeTab, setActiveTab } = useStore()

  return (
    <div className="app">
      <TitleBar />
      
      {activeTab === 'landing' ? (
        <Landing />
      ) : (
        <>
          <nav className="tab-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            <button
              className="tab-btn"
              onClick={() => setActiveTab('landing')}
              style={{ marginLeft: 'auto', fontSize: '10px', color: '#6a6a6a' }}
            >
              ← BACK
            </button>
          </nav>
          
          <div className="tab-content">
            {activeTab === 'launch-system' && <LaunchSystem />}
            {activeTab === 'flight-tracker' && <FlightTracker />}
          </div>
        </>
      )}
      
      <div className="scanlines" />
    </div>
  )
}
