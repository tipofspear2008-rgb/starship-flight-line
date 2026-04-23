import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close')
  },
  app: {
    getPath: (name: string) => ipcRenderer.invoke('app:getPath', name),
    getAssetUrl: (file: string) => {
      if (process.env.NODE_ENV === 'development') {
        return `http://localhost:5173/assets/${file}`
      }
      return `file://${__dirname}/../dist/assets/${file}`
    }
  }
})
