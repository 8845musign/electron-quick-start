window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) {
            element.innerHTML = text;
        }
    }

    for (const dependancy of ['chrome', 'node', 'electron']) {
        replaceText(`${dependancy}-version`, process.versions[dependancy]);
    }
})

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("electron", {
  popupMenu: async (data) => await ipcRenderer.invoke("popupMenu", data),
  // メイン → レンダラー
  on: (channel, callback) =>
    ipcRenderer.on(channel, (event, argv) => callback(event, argv)),
});