const ipcRender = window.electronAPI.ipcRenderer

export const openPlayerFrame = (parmas: any) => {
  ipcRender.send('OPEN_PLAYER_FRAME', parmas)
}

// export const
