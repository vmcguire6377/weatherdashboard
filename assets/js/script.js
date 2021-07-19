 // local storage for city
 var cityName = document.getElementById("cityBox");

 cityBtn.addEventListener("click", function () {
     localStorage.getItem("cityName").innerHTML = localStorage.getItem("cityName");
     var input = document.getElementById("cityBox").value;
     localStorage.setItem("cityName", input);
 });

 function weatherInfo() {
     var cityName = document.getElementById("cityBox").value;
     if (cityName == "") {
         document.getElementById("cityBox").style.borderColor = "red";
         return false;
     }
     else {
         document.getElementById("cityBox").style.borderColor = "black";
     }
     var apiKey = "f38785180bae51b68a019a1c52c15dd3";

     fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=f38785180bae51b68a019a1c52c15dd3")
         .then(function (resp) { return resp.json() })
         .then(function (data) {
             console.log(data);
             if (data.message == "city not found" || data.message == "invalid city") {
                 document.getElementById("cityBox").style.borderColor = "red";
             }
             else {
                 //Call showWeather to display the required information 
                 showWeather(data);
             }
             weatherForecast(cityName);
         });

 };

     function weatherForecast(cityName) {
     fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=f38785180bae51b68a019a1c52c15dd3")
         .then(function (resp) { return resp.json() }) // Convert to json
         .then(function (data) {
             console.log(data);
             showForecast(data);

         });
 }
 function diplayUVIndex() {
     fetch("https://api.openweathermap.org/data/2.5/uvi?" + "&coordinates.lat" + "&coordinates.lon" + "&appid=f38785180bae51b68a019a1c52c15dd3")
     document.getElementById("UVIndex").innerHTML = data.coord.lat + data.coord.lon;
    
 };
 //To display current weather data
 function showWeather(data) {
     document.getElementById("cityName").innerHTML = data.name;
     document.getElementById("currentTime").innerHTML = calculateTime(data.timezone);
     document.getElementById("currentTemp").innerHTML = data.main.temp + " degrees F";
     document.getElementById("currentWeather").innerHTML = data.weather[0].description;
     document.getElementById("humidity").innerHTML = data.main.humidity + " %";
     document.getElementById("windSpeed").innerHTML = data.wind.speed + " mph";
     document.getElementById("UVIndex").innerHTML = data.coord.lat + data.coord.lon;
     document.getElementById("sunrise").innerHTML = calculateTime(data.sys.sunrise);
     document.getElementById("sunset").innerHTML = calculateTime(data.sys.sunset);
     //displayUVIndex();
 };
 //To display 5 day forecast
 function showForecast(data) {
     document.getElementById("dayOne").innerHTML =  document.getElementById("currentTemp").innerHTML = data.list[0].main.temp + " degrees F, " + 
     data.list[0].wind.speed + " mph, " + data.list[0].weather[0].description;
     document.getElementById("currentTemp").innerHTML = data.list[0].main.temp;
     document.getElementById("currentWeather").innterHTML = data.list[0].weather[0].description;
     document.getElementById("windSpeed").innterHTML = data.list[0].wind.speed;
 };

function showDay2(data) {
    document.getElementById("dayTwo").innerHTML =  document.getElementById("currentTemp").innerHTML = data.list[8].main.temp + " degrees F , " + 
    data.list[8].wind.speed + " mph , " + data.list[8].weather[0].description;
    document.getElementById("currentTemp").innerHTML = data.list[0].main.temp;
     document.getElementById("currentWeather").innterHTML = data.list[0].weather[0].description;
     document.getElementById("windSpeed").innterHTML = data.list[0].wind.speed;
 };


 function calculateTime(offset) {
     //This is for current location
     var date = new Date();
     var localOffset = date.getTimezoneOffset() * 60000;
     var utc = date.getTime() + localOffset;
     var desiredTime = new Date(utc + (1000 * offset));
     //Return time in form of string
     return desiredTime.toLocaleString();
 };

    












