const { BrowserWindow } = require('electron');
const path = require('path');

class WindowsManager {
	static #live2d;
	static #msg;
	static #main;

	static init() {
		this.loadLive2d();
		this.loadMsg();
		this.loadMain();
	}

	static loadLive2d() {
		this.#live2d = new BrowserWindow({
			width: 180,
			height: 300,
			// width: 600,
			// height: 300,
			x: 1300,
			y: 500,
			icon: path.join(__dirname,'../lian.ico'),
			frame: false, // 无框窗口
			transparent: true,
			resizable: false,
			webPreferences: {
				preload: path.join(__dirname, 'preload.js'),
				nodeIntegration: true,
				webviewTag: true
			},
		});

		// 窗口置顶
		// mainWindow.setVisibleOnAllWorkspaces(true);
		this.#live2d.setAlwaysOnTop(true);

		// 不遮挡底部事件
		this.#live2d.setIgnoreMouseEvents(false, {forward:true})

		// 隐藏任务栏图标
		this.#live2d.setSkipTaskbar(true);

		this.#live2d.loadFile(path.join(__dirname, 'index.html'));

		// this.#live2d.webContents.openDevTools();
	}

	static loadMsg() {
		this.#msg = new BrowserWindow({
			// width: 600,
			// height: 300,
			width: 210,
			height: 160,
			frame: false,
			transparent: true,
			resizable: false,
			webPreferences: {
				preload: path.join(__dirname, 'msg/msgLoad.js'),
				nodeIntegration: true
			},
		});
	
		this.#msg.setSkipTaskbar(true);
		this.#msg.setAlwaysOnTop(true);
		this.#msg.setIgnoreMouseEvents(false, {forward:true})
		this.#msg.loadFile(path.join(__dirname, 'msg/index.html'));
		this.#msg.hide();
		// 打开调试面板
		// this.#msg.webContents.openDevTools();
	}

	static loadMain() {
		this.#main = new BrowserWindow({
			width: 800,
			height: 500,
			frame: false,
			resizable: false,
			webPreferences: {
				// preload: path.join(__dirname, 'msg/msgLoad.js'),
				nodeIntegration: true
			},
		});

		this.#main.setSkipTaskbar(true);
		this.#main.setAlwaysOnTop(true);
		this.#main.setIgnoreMouseEvents(false, {forward:true});
		this.#main.loadFile(path.join(__dirname, 'main/index.html'));
		// 打开调试面板
		this.#main.webContents.openDevTools();
	}

	static getWinID(winName = "live2d") {
		if (winName === "live2d") {
			return this.#live2d.id;
		} else if (winName === "msg"){
			return this.#msg.id;
		}
	}

	static getWinPosition(winName = "live2d") {
		if (winName === "live2d") {
			return this.#live2d.getPosition();
		} else if (winName === "msg"){
			return this.#msg.getPosition();
		}
	}

	static setWinPosition(winName = "live2d", x, y) {
		if (winName === "live2d") {
			return this.#live2d.setPosition(x, y);
		} else if (winName === "msg"){
			return this.#msg.setPosition(x, y);
		}
	}

	static hideWin(winName = "live2d") {
		if (winName === "live2d") {
			return this.#live2d.hide();
		} else if (winName === "msg"){
			return this.#msg.hide();
		}
	}

	static showWin(winName = "live2d") {
		if (winName === "live2d") {
			return this.#live2d.show();
		} else if (winName === "msg"){
			return this.#msg.show();
		}
	}
}

module.exports = {
	WindowsManager
}