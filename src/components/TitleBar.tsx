import { useState, useEffect } from 'react'

declare global {
  interface Window {
    electronAPI?: {
      window: {
        minimize: () => Promise<void>
        maximize: () => Promise<void>
        close: () => Promise<void>
      }
    }
  }
}

export default function TitleBar() {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    // Check initial state
    const checkMaximized = () => {
      // We'll just track state ourselves
    }
    checkMaximized()
  }, [])

  const handleMinimize = () => window.electronAPI?.window.minimize()
  const handleMaximize = async () => {
    await window.electronAPI?.window.maximize()
    setIsMaximized(!isMaximized)
  }
  const handleClose = () => window.electronAPI?.window.close()

  return (
    <div className="titlebar">
      <span className="titlebar-title">STARSHIP FLIGHT LINE</span>
      <div className="titlebar-controls">
        <button 
          className="titlebar-btn" 
          onClick={handleMinimize}
          title="Minimize"
          style={{ borderColor: '#6a6a6a', background: 'transparent' }}
        />
        <button 
          className="titlebar-btn" 
          onClick={handleMaximize}
          title="Maximize"
          style={{ borderColor: '#6a6a6a', background: isMaximized ? '#6a6a6a' : 'transparent' }}
        />
        <button 
          className="titlebar-btn" 
          onClick={handleClose}
          title="Close"
          style={{ borderColor: '#ff4444', background: 'transparent' }}
        />
      </div>
    </div>
  )
}
