const {
  app,
  BrowserWindow,
  ipcMain,
  shell
} = require('electron')
const path = require('path')
const {
  join
} = require('path')

app.whenReady().then(main)

function main() {
  const window = new BrowserWindow({
    icon: path.join(__dirname, '../src/icon.ico'),
    width: 600,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    frame: false,
    resizable: false,
    maximizable: false,
    transparent: true,
    webPreferences: {
      preload: join(__dirname, './preload.js')
    }
  })

  window.loadFile(join(__dirname, '../public/index.html'))

  window.on('ready-to-show', window.show)

  ipcMain.on('close-window', () => {
    window.close()
  })

  ipcMain.on('minimize-window', () => {
    window.minimize()
  })

  window.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    shell.openExternal(url);
  });
}