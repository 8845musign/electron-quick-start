window.addEventListener('contextmenu', async(e) => {
    e.preventDefault();
    await window.electron.popupMenu();
});