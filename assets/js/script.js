//var api = "0712f9f68788db84601c6f93f0653d20";
var iconImg = document.getElementById("weather-icon");
var loc = document.querySelector("#location");
var tempC = document.querySelector(".c");
var tempF = document.querySelector(".f");
//var desc = documemt.querySelector(".desc");
var sunriseDOM = document.querySelector(".sunrise");
var sunsetDOM = document.querySelector(".sunset");


//add function to respond to button click, When the search button is clicked,
//the embedded api should search info for the input city.
window.addEventListener("click", () => {});
let long;
let lat;
//accessing location of user
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        //storing longitude and latitude in variables
        long = position.coords.longitude;
        lat = position.coords.latitude;
        var base = "api.openweathermap.org/data/2.5/forecast?q={city name}&0712f9f68788db84601c6f93f0653d20";
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