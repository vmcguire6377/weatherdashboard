var city = "";
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var deleteButton = $("#clear-history");
var currentCity = $("#current-city");
var temperature = $("#temperature");
var humidity = $("#humidity");
var windSpeed = $("#wind-speed");
var uvIndex = $("#uv-index");
var citiesList = [];

function find(c) {
    for (var i = 0; i < citiesList.length; i++) {
        if (c.toUpperCase() === citiesList[i]) {
            return -1;
        }
    }
    return 1;
}
var APIKey = "d857675ceeb856e1740d33638dd8b4e4";;
function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        city = searchCity.val().trim();
        currentWeather(city);
    }
}

// call for the api
function currentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        var weathericon = response.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
        var date = new Date(response.dt * 1000).toLocaleDateString();
        $(currentCity).html(response.name + "(" + date + ")" + "<img src=" + iconurl + ">");
        // convert temperature to fahrenheit 
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        $(temperature).html((tempF).toFixed(2) + "&#8457");
        // Display Humidity
        $(humidity).html(response.main.humidity + "%");
        //Display Wind speed and convert to MPH
        var ws = response.wind.speed;
        var windsmph = (ws * 2.237).toFixed(1);
        $(windSpeed).html(windsmph + "MPH");
        // Display UVIndex.        
        UVIndex(response.coord.lon, response.coord.lat);
        forecast(response.id);
        if (response.cod == 200) {
            citiesList = JSON.parse(localStorage.getItem("cityname"));
            console.log(citiesList);
            if (citiesList == null) {
                citiesList = [];
                citiesList.push(city.toUpperCase()
                );
                localStorage.setItem("cityname", JSON.stringify(citiesList));
                addToList(city);
            }
            else {
                if (find(city) > 0) {
                    citiesList.push(city.toUpperCase());
                    localStorage.setItem("cityname", JSON.stringify(citiesList));
                    addToList(city);
                }
            }
        }
    });
}
// UVI response
function UVIndex(ln, lt) {    
    var uvqURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lt + "&lon=" + ln;
    $.ajax({
        url: uvqURL,
        method: "GET"
    }).then(function (response) {
        $(uvIndex).html(response.value);
    });
}

// 5 days forecast
function forecast(cityid) {
    var dayover = false;
    var queryforcastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + APIKey;
    $.ajax({
        url: queryforcastURL,
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < 5; i++) {
            var date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            var iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
            var tempK = response.list[((i + 1) * 8) - 1].main.temp;
            var tempF = (((tempK - 273.5) * 1.80) + 32).toFixed(2);
            var humidity = response.list[((i + 1) * 8) - 1].main.humidity;

            $("#fDate" + i).html(date);
            $("#fImg" + i).html("<img src=" + iconurl + ">");
            $("#fTemp" + i).html(tempF + "&#8457");
            $("#fHumidity" + i).html(humidity + "%");
        }
    });
}

// add the city to the list 
function addToList(c) {
    var listEl = $("<li>" + c.toUpperCase() + "</li>");
    $(listEl).attr("class", "list-group-item");
    $(listEl).attr("data-value", c.toUpperCase());
    $(".list-group").append(listEl);
}

// display the city again in the dashboard when clicked
function invokePastSearch(event) {
    var liEl = event.target;
    if (event.target.matches("li")) {
        city = liEl.textContent.trim();
        currentWeather(city);
    }
}

// render function
function loadlastCity() {
    $("ul").empty();
    var citiesList = JSON.parse(localStorage.getItem("cityname"));
    if (citiesList !== null) {
        citiesList = JSON.parse(localStorage.getItem("cityname"));
        for (i = 0; i < citiesList.length; i++) {
            addToList(citiesList[i]);
        }
        city = citiesList[i - 1];
        currentWeather(city);
    }
}

// delete history
function clearHistory(event) {
    event.preventDefault();
    citiesList = [];
    localStorage.removeItem("cityname");
    document.location.reload();
}

//Click Handlers
$("#search-button").on("click", displayWeather);
$(document).on("click", invokePastSearch);
$(window).on("load", loadlastCity);
$("#clear-history").on("click", clearHistory);




