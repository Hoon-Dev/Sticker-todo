var electron = require("electron");

var {app, BrowserWindow, Menu, ipcMain} = electron;
var mainWindow;

process.env.NODE_ENV = "production";

function createMainWindow(){
    mainWindow = new BrowserWindow({
        width: 275,
        height: 340,
        frame: false,
        resizable: false,
        center: true,
        show: false,
        transparent: true,
        webPreferences:{
            devTools: false,
            nodeIntegration: true
        }
    });
    mainWindow.loadURL("file://"+__dirname+"/html/mainWindow.html");
    Menu.setApplicationMenu(null);
    mainWindow.once("ready-to-show",function(){
        mainWindow.show();
    });
}

app.on("ready", function(){
    createMainWindow();
});

ipcMain.on("window:close",function(event, args){
    app.quit();
});