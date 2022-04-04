


function BuildForecastUrl(lat, long) {
    return
}

function LoadWeather(query) {
    var apiQuery = "https://api.openweathermap.org/data/2.5/weather?appid=4e3d18816754402569ac77dc78b5f775&q=" + query;
    
    console.log(apiQuery);
    fetch(apiQuery)
        .then(function(response) {
            if (!response.ok) {
                console.log("not okay");
            }
            response.json()
                .then(function(data) {
                    LoadForecast(data.coord.lat, data.coord.lon);
                });
        });
}


function LoadForecast(lat, lon) {
    var forecastApiUrl =  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=4e3d18816754402569ac77dc78b5f775`
    
    console.log(forecastApiUrl);
    fetch(forecastApiUrl)
        .then(function(response) {
            if (!response.ok) {
                console.log("not okay");
            }
            response.json()
                .then(function(data) {
                    ProcessForecast(data);
                });
        });
}

function ProcessForecast(forecastWeather) {
    console.log(forecastWeather);
    document.getElementById("weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${forecastWeather.current.weather[0].icon}@2x.png`)
    document.getElementById("weather-current-temp").textContent = forecastWeather.current.temp;
    document.getElementById("weather-current-wind").textContent = forecastWeather.current.wind_speed;
    document.getElementById("weather-current-humidity").textContent = forecastWeather.current.humidity;
    document.getElementById("weather-current-uv").textContent = forecastWeather.current.uvi;

    for (var i = 0; i < 5; i++) {
        var day = forecastWeather.daily[i];
        document.getElementById(`for${i}Temp`).textContent = day.temp.max;
        document.getElementById(`for${i}Wind`).textContent = day.wind_speed;
        document.getElementById(`for${i}Hum`).textContent = day.humidity;
        var img = document.getElementById(`for${i}Img`);
        img.setAttribute("src", `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`)
        img.setAttribute("alt", day.weather[0].main);
    }

    console.log("processedCurrentWeather");
}



var searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function(event) {
    var query = document.getElementById("search-city").value;

    LoadWeather(query);

})