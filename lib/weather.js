var request = require('request');
var cache = require('memory-cache');
var CACHE_TIMEOUT = 1000*3600; //ms

function getSimpleWeather(weatherData) {
    var weatherId = weatherData[0].id;
    return openWeatherToSimpleWeather(weatherId);
}

/*
 * Maps openWeather API weather codes to simpleWeather code
 * Based on http://bugs.openweathermap.org/projects/api/wiki/Weather_Condition_Codes
 */
function openWeatherToSimpleWeather(weatherId) {
  //weather types
  var simpleWeatherTypes = {
    0: 'error',
    1: 'sunny',
    2: 'partly cloudy',
    3: 'cloudy',
    4: 'light rain',
    5: 'rain',
    6: 'heavy rain',
    7: 'storm',
    8: 'snow',
    9: 'fog'
  };

  //map openWeather weatherID to weather type
  if((weatherId >= 200 && weatherId < 300)  || 
     (weatherId >= 900 && weatherId <= 902) || 
     (weatherId >= 957 && weatherId <= 962))      return simpleWeatherTypes[7];
  else if(weatherId >= 300 && weatherId <= 500)   return simpleWeatherTypes[4];
  else if(weatherId === 501 || weatherId === 502) return simpleWeatherTypes[5];
  else if(weatherId > 502 && weatherId <= 522)    return simpleWeatherTypes[6];
  else if(weatherId >= 600 && weatherId <= 621)   return simpleWeatherTypes[8];
  else if(weatherId >= 701 && weatherId <= 741)   return simpleWeatherTypes[9];
  else if(weatherId === 800)                      return simpleWeatherTypes[1];
  else if(weatherId === 801 || weatherId === 802) return simpleWeatherTypes[2];
  else if(weatherId === 803 || weatherId === 804) return simpleWeatherTypes[3];
  return 0; // 0 => 'error'
}

function closestForecast(data, ts) {
  var closest = { delta: Number.MAX_VALUE, weather: null};
  for (var idx in data.list) {
    var item = data.list[idx];
    var delta = Math.abs(ts - item.dt);
    if (delta < closest.delta) {
      closest.delta = delta;
      closest.weather = {
        temp: item.main.temp,
        weather: getSimpleWeather(item.weather)
      };
    }
    return closest;
  }
}

module.exports = {
  weather: function(req, res) {
    var ts = parseInt(req.param('timestamp')) || Date.now();
    var city = req.param('city'); //default value could be festival_city from memory cache

    var cacheKey = 'weather' + city;
    var cached = cache.get(cacheKey);    


    if (cached) {
      //cache hit
      var closest = closestForecast(cached, ts);
      res.type('application/json; charset=utf-8').end(JSON.stringify(closest.weather));
    } else {      
      //cache miss - happens once per hour (cache put time to live is 1000*3600 ms)
      var url = ['http://api.openweathermap.org/data/2.5/forecast?q=', city, '&mode=json&units=metric'].join('');
      //fetch 14 day weather forecast
      request(url, function (error, response, body) {      
        //default is "error"
        var closest = 'error';
        var data = JSON.parse(body);

        //if openWeatherMap API request 'OK'
        if (!error && data.cod === "200") {
          //find the closest matching from the 14d forecast and cache it
          closest = closestForecast(data, ts);
          cache.put(cacheKey, data, CACHE_TIMEOUT);
        } 
        res.type('application/json; charset=utf-8').end(JSON.stringify(closest.weather));
      }); 
    }
  }
};