import { create } from 'zustand'

export type TabType = 'landing' | 'launch-system' | 'flight-tracker'

interface AppState {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  
  selectedComponent: string | null
  setSelectedComponent: (id: string | null) => void
  
  selectedMission: string | null
  setSelectedMission: (id: string | null) => void
  
  flightPlaying: boolean
  setFlightPlaying: (playing: boolean) => void
  
  flightSpeed: number
  setFlightSpeed: (speed: number) => void
  
  flightProgress: number
  setFlightProgress: (progress: number) => void
}

export const useStore = create<AppState>((set) => ({
  activeTab: 'landing',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  selectedComponent: null,
  setSelectedComponent: (id) => set({ selectedComponent: id }),
  
  selectedMission: null,
  setSelectedMission: (id) => set({ selectedMission: id }),
  
  flightPlaying: false,
  setFlightPlaying: (playing) => set({ flightPlaying: playing }),
  
  flightSpeed: 1,
  setFlightSpeed: (speed) => set({ flightSpeed: speed }),
  
  flightProgress: 0,
  setFlightProgress: (progress) => set({ flightProgress: progress }),
}))
