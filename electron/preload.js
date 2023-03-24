const {
  ipcRenderer,
  contextBridge
} = require('electron')

const API = {
  close: () => {
    ipcRenderer.send('close-window')
  },

  minimize: () => {
    ipcRenderer.send('minimize-window')
  }
}

contextBridge.exposeInMainWorld('api', API)