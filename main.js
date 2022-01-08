const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron')
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

// コンテキストメニューを表示
// メニューを作成
const contextMenu = Menu.buildFromTemplate([
    {
      label: "Test Menu",
      click: () => {
        // ウィンドウを取得して、レンダラーに通知
        const w = BrowserWindow.getFocusedWindow();
        w.webContents.send("popuo-return");
      },
    },
    { type: "separator" },
    { role: "quit" },
  ]);
  // コンテキストメニューを表示
  ipcMain.handle("popupMenu", (event) => {
    const w = BrowserWindow.getFocusedWindow();
    contextMenu.popup(w);
    return;
  });