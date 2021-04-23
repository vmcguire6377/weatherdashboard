var apiKey = "0712f9f68788db84601c6f93f0653d20";
var currentWeather = $("currentWeather");
var futureWeather = $("#futureWeather");
var iconImg = document.getElementById("weather-icon");
var loc = document.querySelector("#location");
var tempC = document.querySelector(".c");
var tempF = document.querySelector(".f");
//var desc = documemt.querySelector(".desc");
var sunriseDOM = document.querySelector(".sunrise");
var sunsetDOM = document.querySelector(".sunset");

var locationArray;

if (localStorage.getItem("localWeatherSearch")) {
    locationArray = JSON.parse(localStorage.getItem("localWeatherSearch"));
}else{
    locationArray = [];
};


function displayCurrentWeather(cityName) {
let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=${cityName}&${apiKey}";

$.get(queryUrl).then(function(response) {
    let currTime = new Date(response.dt*1000);
    let weatherIcon = "https://openweathermap.org/img/wn/$(response.weather[0].icon}@2px.png";

    currentWeatherDiv.html("
        <h2>${response.name}, ${response.sys.country} (${currTime.getMonth()+1}/${currTime.getDate()}/${currTime.getFullYear()})<img src = ${"weatherIcon"}</h2>});
    <p>Temperature: ${response.main.temp} &#176;F</p>
    <p>Humidity: ${response.main.humidity}%</p>
    <p>Wind Speed: ${response.wind.speed}m/s</p>
", returnUVIndex(response.coord))
createHistoryButton(respons.name);
    
})
};



//add function to respond to button click, When the search button is clicked,
//the embedded api should search info for the input city.
/*</h2 addEventListener("click", () => {});
//let long;
//let lat;
//accessing location of user
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        //storing longitude and latitude in variables
        long = position.coords.longitude;
        lat = position.coords.latitude;
        var base = "https://api.openweathermap.org/data/2.5/weather?q=${city name}&${apiKey}";
        console.log(base);
        //use fetch to retrieve data
        fetch(base).then((response) => {
            return response.json();
        })
        .then((data) => {
            var {temp} = data.main;
            var {place} = data.name;
            var {description, icon } = data.weather[0];
            var {sunrise, sunset} = data.sys;

            var iconUrl = "http://openweathermap.org/img/wn/${icon}@2x.png";
            var fahrenheit = (temp * 9) / 5 + 32;

            //converting epoch time to gmt
            var sunriseGMT = new Date(sunrise * 1000);
            var sunsetGMT = new Date(sunset * 1000);
            //interacting with the DOM to present data
            loc.textContent = "${place}";
desc.textContent = "${description}";
tempC.textContent = "${temp.toFixed(2)} C";
tempF.textContent = "${temp.toFixed(2)} F";
sunriseDOM.textContent = "${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}";
sunsetDOM.textContent = "${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}";
        });
    });

}
    











//when the info is captured for the searched city, the current weather data should display
//in the card body; and the city searched should be saved in local storage and display
//in a placeholder form under the search area.
*/