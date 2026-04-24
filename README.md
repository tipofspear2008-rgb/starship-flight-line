# 🚀 Starship Flight Line

> A Tony‑Stark grade Starship system briefing + flight replay console.

![Platform](https://img.shields.io/badge/Platform-Windows-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-blue)

---

## ⬡ Overview

**Starship Flight Line** is a fully offline, portable Windows desktop application for exploring SpaceX's Starship Launch System.

### Features

**Tab A — Starship Launch System**
- Interactive 3D model of the full Starship stack (Ship + Booster + Tower)
- Click any component to reveal detailed HUD briefing
- Component specs, role, why it matters, status, sources

**Tab B — Starship Flight Tracker**
- 3D spinning Earth globe with monochrome styling
- Select from all Starship Integrated Flight Tests (IFT-1 through IFT-6)
- Flight path visualization with playback controls
- Mission briefing panel with key events timeline

---

## 📦 Build Your Own .exe

### Prerequisites
- **Node.js** v18+ ([nodejs.org](https://nodejs.org))
- **Git** ([git-scm.com](https://git-scm.com))
- **8GB+ RAM** recommended for Three.js builds

### Build Steps

```bash
# 1. Clone the repo
git clone https://github.com/tipofspear2008-rgb/starship-flight-line
cd starship-flight-line

# 2. Install dependencies
npm install

# 3. Build the Vite app
npm run build:vite

# 4. Package as portable Windows .exe
npx electron-builder --win portable
```

The executable will be at:
```
release/Starship Flight Line.exe
```

### Build Options

| Command | Output |
|---------|--------|
| `npx electron-builder --win portable` | Single portable .exe |
| `npx electron-builder --win` | Installer + portable |
| `npm run build:vite` | Web app only (no .exe) |

---

## 🎮 Usage

### Tab A — Launch System
- **DRAG** to rotate the 3D model
- **SCROLL** to zoom in/out
- **CLICK** any component to open the briefing panel
- Press **ESC** or click × to close the panel

### Tab B — Flight Tracker
- Select a mission from the dropdown
- Click **▶** to play the flight replay
- Use the **scrubber** to seek to any point
- Change **speed** (0.25x → 5x)
- Click **MISSION BRIEF** for full mission details

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Space` | Play / Pause |
| `Esc` | Close briefing panel |
| `←` / `→` | Seek -/+ 10% |

---

## 📋 Data Sources

All flight data is sourced from publicly available information:

| Source | URL |
|--------|-----|
| SpaceX Official | https://www.spacex.com/launches/ |
| Wikipedia | https://en.wikipedia.org/wiki/SpaceX_Starship |
| NASA | https://www.nasa.gov/ |

### Mission Data
- **IFT-1** — April 17, 2023
- **IFT-2** — November 18, 2023
- **IFT-3** — March 14, 2024
- **IFT-4** — June 6, 2024
- **IFT-5** — October 13, 2024
- **IFT-6** — November 19, 2024

### Trajectory Data Note
Per-second telemetry is not publicly available for all flights. Where exact coordinates are unavailable, launch and splashdown/catch points are shown as verified waypoints. The data model is designed to accept future detailed telemetry updates.

---

## 🗂️ Project Structure

```
starship-flight-line/
├── electron/
│   ├── main.ts          # Electron main process
│   └── preload.ts       # Preload script
├── public/
│   └── earth-texture.jpg  # Globe texture (fallback)
├── src/
│   ├── components/
│   │   ├── ComponentBriefing.tsx  # HUD briefing panel
│   │   ├── FlightTracker.tsx      # Tab B - Globe + tracker
│   │   ├── LaunchSystem.tsx       # Tab A - 3D model viewer
│   │   ├── Landing.tsx             # Landing page
│   │   └── TitleBar.tsx            # Window title bar
│   ├── data/
│   │   ├── components.json   # Component metadata (14 parts)
│   │   ├── missions.json     # 6 real IFT missions
│   │   └── types.ts          # TypeScript schemas
│   ├── store/
│   │   └── useStore.ts       # Zustand state store
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles + HUD theme
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🎨 Design

- **Color:** Pure black (#000) + white (#fff) monochrome
- **Typography:** Orbitron (headings) + Space Mono (body)
- **Aesthetic:** Tony Stark HUD — glass panels, thin lines, scanline overlay
- **3D:** Three.js with @react-three/fiber
- **Globe:** Three.js sphere with procedural texture
- **State:** Zustand

---

## 📄 License

MIT License — built by OpenClaw AI agent for Bruno Mesa.

NASA imagery used in this project is public domain. See [NASA Visible Earth](https://visibleearth.nasa.gov/) for source imagery and licensing terms.

Starship 3D models from the community (CC Attribution). Attribution included in-app.
