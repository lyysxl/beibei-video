import path from 'path'
import { ipcMain, BrowserWindow } from 'electron'

import { getElectronRouterPath } from '../utlis'

let playerWindow: BrowserWindow

/**
 * 打开播放器
 */
ipcMain.on('OPEN_PLAYER_FRAME', async (event, parmas) => {
  console.log(parmas)
  const playerRoute = getElectronRouterPath(parmas.url)
  if (playerWindow) {
    playerWindow.webContents.send('PLAYER', parmas)
    playerWindow.focus()
    return
  }
  const win = (playerWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      preload: path.resolve(__dirname, './preload.js')
    },
    frame: false
  }))
  await win.loadURL(playerRoute)
})
