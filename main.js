const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow, ipcMain} = electron;
var conn = require('./data/controller');
//db connection
conn.data();
// SET ENV
process.env.NODE_ENV = 'development';




let mainWindow;

//listen for app to be readyState
app.on('ready', function () {

    //create new window
    mainWindow = new BrowserWindow({
        resizable: false,
        width: 900, height: 600
        // webPreferences: {
        //
        //     nodeIntegration: false
        // }
    });
    //load html file
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './views/dashboard.html'),
        protocol: 'file:',
        slashes: true,
    }));
    // mainWindow.setMenu(null);
});


ipcMain.on('addLocation', (event, location) => {
    conn.addLocation(location, function (data) {
        event.returnValue = data;
    });
});

ipcMain.on('getAllCities', (event, check) => {
    conn.getAllCities( function (data) {
        event.returnValue = data;
    });
});
ipcMain.on('getAllCitiesToCallWeather', (event, check) => {
    conn.getAllCitiesToCallWeather( function (data) {
        event.returnValue = data;
    });
});

ipcMain.on('deleteLocation', (event, location) => {
    conn.deleteLocation(location, function (data) {
        event.returnValue = data;
    });
});

ipcMain.on('deleteLocationHistory', (event, location) => {
    conn.deleteLocationHistory(location, function (data) {
        event.returnValue = data;
    });
});
ipcMain.on('refresh', (event, date) => {
    conn.updateRefreshTime(date, function (data) {
        event.returnValue = data;
    });
});
ipcMain.on('isExsist', (event, city) => {
    conn.isExsist(city, function (data) {
        event.returnValue = data;
    });
});
ipcMain.on('enableLocation', (event, city) => {
    conn.setOnline(city, function (data) {
        event.returnValue = data;
    });
});

ipcMain.on('addWeatherData', (event, cityId, cityName, date, temp, humidity, pressure, description, weathercode, rain) => {
    conn.addWeatherData(cityId, cityName, date, temp, humidity, pressure, description, weathercode, rain).then(function (data) {
        event.returnValue = data;
    });
});


