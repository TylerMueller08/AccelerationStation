const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const ntClient = require('wpilib-nt-client');
const client = new ntClient.Client();

client.setReconnectDelay(1000);

// Connects the client to the server on 4593's roborio
client.start((isConnected, err) => {
  // Displays the error and the state of connection
  console.log({ isConnected, err });
}, 'roborio-4593.local');

// Adds a listener to the client
client.addListener((key, val, type, id) => {
  console.log({ key, val, type, id });
})

if (client.isConnected()) {
  console.log("Connected!");
} else {
  console.log("Not Connected.");
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1000,
    minHeight: 500,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.setBackgroundColor('#343B48');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.webContents.send('start-animation');
  });

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
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
