'use strict'
const sql = require("mssql/msnodesqlv8");


const pool = new sql.ConnectionPool({
    database: 'ZKEWED_WEATHER',
    server: 'ASHAN',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
})

function data() {
    pool.connect();
}


function addLocation(location, callback) {
    pool.request().query("INSERT INTO CITY VALUES('" + location + "','ONLINE')", (err, result) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        callback(result);
    })
}

var addWeatherData = function (cityId, cityName, date, temp, humidity, pressure, description, weathercode, rain) {
    return new Promise((resolve, reject) => {
        pool.request().query("INSERT INTO WEATHER_C VALUES('" + cityId + "','" + cityName + "','" + date + "','" + temp + "','" + humidity + "','" + pressure + "','" + description + "','" + weathercode + "','" + rain + "','ONLINE')", (err, result) => {
            if (err) {
                console.log(err);
                process.exit(0);
            }
            resolve(result);
        })
    })
}

function getAllCities(callback) {
    pool.request().query("SELECT * FROM CITY", (err, result) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        callback(result);
    })
}
function getAllCitiesToCallWeather(callback) {
    pool.request().query("SELECT * FROM CITY  WHERE STATUS='ONLINE'", (err, result) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        callback(result);
    })
}
function isExsist(city,callback) {
    pool.request().query("SELECT * FROM CITY  WHERE CITY_NAME='"+city+"'", (err, result) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        callback(result);
    })
}

function updateRefreshTime(date, callback) {
    pool.request().query("UPDATE REFRESH_TIME SET DATE_TIME='" + date + "'  where REFRESH_ID='1'", (err, result) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        callback(result);
    })
}

function deleteLocation(location, callback) {

    pool.request().query("UPDATE CITY SET STATUS='OFFLINE'  where CITY_NAME='" + location + "'", (err, result) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        callback(result);
    })
}


function setOnline(location, callback) {

    pool.request().query("UPDATE CITY SET STATUS='ONLINE'  where CITY_NAME='" + location + "'", (err, result) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        callback(result);
    })
}

function deleteLocationHistory(location, callback) {
    pool.request().query("DELETE FROM WEATHER_C WHERE CITY_NAME='" + location + "'", (err, result) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        callback(result);
    })
}


module.exports.data = data;
module.exports.addLocation = addLocation;
module.exports.getAllCities = getAllCities;
module.exports.deleteLocation = deleteLocation;
module.exports.deleteLocationHistory = deleteLocationHistory;
module.exports.addWeatherData = addWeatherData;
module.exports.updateRefreshTime = updateRefreshTime;
module.exports.getAllCitiesToCallWeather = getAllCitiesToCallWeather;
module.exports.isExsist = isExsist;
module.exports.setOnline = setOnline;

