const { app, BrowserWindow, ipcMain } = require('electron');
const { WindowsManager } = require("./windowsManager");
const { trayManager } = require("./tray.js");

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.on('ready', () => {
	trayManager.init()
	WindowsManager.init();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("getWinPosition", (ev, winName) => {
	return WindowsManager.getWinPosition(winName);
})
ipcMain.on("setWinPosition", (ev, winName, x, y) => {
	WindowsManager.setWinPosition(winName, x, y);
})

ipcMain.handle("getWindowID", async (ev, winName) => {
	return WindowsManager.getWinID(winName);
});
ipcMain.on("hideWindow", async (ev, winName) => {
	WindowsManager.hideWin(winName);
})
ipcMain.on("showWindow", async (ev, winName) => {
	WindowsManager.showWin(winName);
})
