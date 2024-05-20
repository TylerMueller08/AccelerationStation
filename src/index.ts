// https://github.com/cjlawson02/ntcore-ts-client

import { app, BrowserWindow, ipcMain } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
const path = require("path");

import { NetworkTables } from "ntcore-ts-client";

// Connect to Network Table using Team Number
const ntcore = NetworkTables.getInstanceByTeam(4593); // Team #, Port #

// Create the autoMode topic w/ a default return value of "No Auto"

console.log("Robot Connecting: " + ntcore.isRobotConnecting());
console.log("Robot Connected: " + ntcore.isRobotConnected());

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1590,
    height: 642,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, 'preload.ts')
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.setResizable(false);
  mainWindow.setPosition(5, 5);

  // Close Application
  ipcMain.on('closeApp', () => {
    mainWindow.close();
  })

  // Minimize Application
  ipcMain.on('minimizeApp', () => {
    mainWindow.minimize();
  })

  // Maximize Application
  ipcMain.on('maximizeApp', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.