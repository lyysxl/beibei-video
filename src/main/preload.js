// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  ipcRenderer,
  sendMessageToMain: (message) => {
    ipcRenderer.send('message-from-renderer', message)
  },
  receiveMessageFromMain: (callback) => {
    ipcRenderer.on('PLAYER', (event, message) => {
      callback(message)
    })
  }
})
