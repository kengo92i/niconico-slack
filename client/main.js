const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

function createWindow() {

    const { screen } = electron;
    let size = screen.getPrimaryDisplay().size;

    mainWindow = new BrowserWindow({
        left: 0,
        top: 0,
        width: size.width,
        height: size.height,
        frame: true,
        show: true,
        transparent: true,
        resizable: false,
        hasShadow: false,
        alwaysOnTop: true
    });

    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.maximize();

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
