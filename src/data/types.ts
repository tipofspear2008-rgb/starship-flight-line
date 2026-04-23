export interface Component {
  id: string
  name: string
  shortName: string
  category: 'ship' | 'booster' | 'engine' | 'stage' | 'ground'
  role: string
  keyFacts: { label: string; value: string }[]
  whyItMatters: string
  status: string
  sources: { name: string; url: string }[]
}

export interface Mission {
  id: string
  displayName: string
  shortName: string
  dateUTC: string
  dateText: string
  launchSite: string
  ship: string
  booster: string
  outcome: string
  summary: string
  keyEvents: { time: string; event: string; type: string }[]
  flightPath: {
    launchLat: number | null
    launchLon: number | null
    splashdownLat: number | null
    splashdownLon: number | null
    status: string
  }
  sources: { name: string; url: string }[]
}

export interface TrajectoryPoint {
  t: number
  lat: number
  lon: number
  alt?: number
  speed?: number
}

export interface Trajectory {
  missionId: string
  sourceNote: string
  data: TrajectoryPoint[]
}
