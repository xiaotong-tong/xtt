const { app, Tray, Menu } = require('electron');
const path = require('path');
const { WindowsManager } = require("./windowsManager");

class trayManager {
 	static #tray;

	static init() {
		this.#tray = new Tray(path.join(__dirname,'../lian.ico'));
		const contextMenu = Menu.buildFromTemplate([
			{
				label: '退出',
				click: () => {
					app.quit();
					app.quit();
				}
			}
		]); 
		this.#tray.setToolTip('涟');
		this.#tray.setContextMenu(contextMenu);
		this.#tray.on('click',function(){
			WindowsManager.showWin("live2d");
		})
		this.#tray.on('right-click', () => {
			this.#tray.popUpContextMenu(contextMenu);
		});
	}
}

module.exports = {
	trayManager
}