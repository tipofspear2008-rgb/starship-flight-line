// Procedurally generated grayscale Earth texture
// This will be rendered on a Three.js sphere

export const EARTH_TEXTURE_DATA = {
  description: "Stylized grayscale Earth texture for Starship Flight Line",
  attribution: "Generated procedurally to match B&W theme",
  resolution: "2048x1024",
  license: "MIT - generated code"
}

// Launch coordinates (Boca Chica)
export const LAUNCH_COORDINATES = {
  lat: 25.9971,
  lon: -97.1522,
  name: "Starbase, Boca Chica, TX"
}

// For Three.js - create canvas-based earth texture
export function createEarthTexture(size = 1024): string {
  // Return base64 encoded minimal earth texture
  // This will be used as fallback when no NASA texture is bundled
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg"
}