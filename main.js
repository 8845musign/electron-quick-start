const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const path = require('path')
const { platform } = require('process')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')

    win.webContents.openDevTools()
}

const menu = new Menu()
menu.append(new MenuItem({
    label: 'Electron',
    submenu: [{
        role: 'help',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
        click: () => { console.log('Electron rocks!') }
    }]
}))

Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-close', ()=>{
    if (process.platform !== 'darwin') app.quit();
})