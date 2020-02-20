var cities = [];

function renderButtons() {
  $("#city-list").empty();
  for (var i = 0; i < cities.length; i++) {
    var a = $("<button>");
    a.addClass("city-btn");
    a.attr("data-name", cities[i]);
    a.text(cities[i]);
    $("#city-list").prepend(a);
  }
}

function displayCityInfo() {
  $("#forecast-row").empty();
  var city = $(this).attr("data-name");
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=e935932a7a61cfd6e86777324be7ec1a";
  $.ajax({
    url: queryURL,
    mehtod: "GET"
  }).then(function(response) {
    var k = response.main.temp;
    var f = ((k - 273.15) * 9) / 5 + 32;
    var currentDay = moment.unix(response.dt).format("MM/DD/YYYY");

    var icon =
      "<img src='https://openweathermap.org/img/w/" +
      response.weather[0].icon +
      ".png' alt='Icon depicting current weather.'>";

    var lon = response.coord.lon;
    var lat = response.coord.lat;
    $("#city-name").text(city + " " + currentDay);

    $("#city-name").append(icon);

    $("#today-temp").text(f.toFixed(2) + "°F");
    $("#today-humid").text(response.main.humidity + "%");
    $("#today-wind").text(response.wind.speed + "Mph");

    var queryTHREE =
      "https://api.openweathermap.org/data/2.5/uvi?appid=e935932a7a61cfd6e86777324be7ec1a&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: queryTHREE,
      method: "GET"
    }).then(function(uvIndex) {
      console.log(queryTHREE);
      $("#today-uv").html(uvIndex.value);
      if (uvIndex.value > 5.99) {
        $("#today-uv").addClass("danger");
        $("#today-uv").removeClass("safe");
      } else {
        $("#today-uv").addClass("safe");
        $("#today-uv").removeClass("danger");
      }
    });
  });

  var queryTWO =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=e935932a7a61cfd6e86777324be7ec1a";

  $.ajax({
    url: queryTWO,
    method: "GET"
  }).then(function(forecast) {
    for (var i = 0; i < 40; i = i + 8) {
      var forecastDate = forecast.list[i].dt;
      var foreIcon =
        "<img src='https://openweathermap.org/img/w/" +
        forecast.list[i].weather[0].icon +
        ".png' alt='Icon depicting current weather.'>";

      var forDate = moment.unix(forecastDate).format("MM/DD/YYYY");
      var kel = forecast.list[i].main.temp;
      var fTemp = ((kel - 273.15) * 9) / 5 + 32;
      var newDiv = $("<div class ='future'>");
      var fDate = $("<div>").text(forDate);
      var fIcon = $("<div>").html(foreIcon);
      var forTemp = $("<div>").text("Temp: " + fTemp.toFixed(2) + "°F");
      var fHumid = $("<div>").text(
        "Humidity: " + forecast.list[i].main.humidity
      );

      newDiv.append(fDate, fIcon, forTemp, fHumid);
      $("#forecast-row").append(newDiv);
    }
  });
}
$("#add-city").on("click", function(event) {
  event.preventDefault();
  var city = $("#city-input")
    .val()
    .trim();
  if (city.length < 1) {
    return;
  }
  cities.push(city);
  cityTop(city);
  renderButtons();
});
$(document).on("click", ".city-btn", displayCityInfo);

//Basicly just cut and paste previous code to make it display after entering city instead of just clicking from list
//I feel like there has to be a more efficent way to have done it.   congrats on your new job, you will be missed
function cityTop(city) {
  $("#forecast-row").empty();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=e935932a7a61cfd6e86777324be7ec1a";
  $.ajax({
    url: queryURL,
    mehtod: "GET"
  }).then(function(response) {
    var k = response.main.temp;
    var f = ((k - 273.15) * 9) / 5 + 32;
    var currentDay = moment.unix(response.dt).format("MM/DD/YYYY");

    var icon =
      "<img src='http://openweathermap.org/img/w/" +
      response.weather[0].icon +
      ".png' alt='Icon depicting current weather.'>";

    var lon = response.coord.lon;
    var lat = response.coord.lat;
    $("#city-name").text(city + " " + currentDay);

    $("#city-name").append(icon);

    $("#today-temp").text(f.toFixed(2) + "°F");
    $("#today-humid").text(response.main.humidity + "%");
    $("#today-wind").text(response.wind.speed + "Mph");

    var queryTHREE =
      "https://api.openweathermap.org/data/2.5/uvi?appid=e935932a7a61cfd6e86777324be7ec1a&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: queryTHREE,
      method: "GET"
    }).then(function(uvIndex) {
      console.log(queryTHREE);
      $("#today-uv").html(uvIndex.value);
      if (uvIndex.value > 5.99) {
        $("#today-uv").addClass("danger");
        $("#today-uv").removeClass("safe");
      } else {
        $("#today-uv").addClass("safe");
        $("#today-uv").removeClass("danger");
      }
    });
  });
  var queryTWO =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=e935932a7a61cfd6e86777324be7ec1a";

  $.ajax({
    url: queryTWO,
    method: "GET"
  }).then(function(forecast) {
    for (var i = 0; i < 40; i = i + 8) {
      var forecastDate = forecast.list[i].dt;
      var foreIcon =
        "<img src='http://openweathermap.org/img/w/" +
        forecast.list[i].weather[0].icon +
        ".png' alt='Icon depicting current weather.'>";

      var forDate = moment.unix(forecastDate).format("MM/DD/YYYY");
      var kel = forecast.list[i].main.temp;
      var fTemp = ((kel - 273.15) * 9) / 5 + 32;
      var newDiv = $("<div class ='future'>");
      var fDate = $("<div>").text(forDate);
      var fIcon = $("<div>").html(foreIcon);
      var forTemp = $("<div>").text("Temp: " + fTemp.toFixed(2) + "°F");
      var fHumid = $("<div>").text(
        "Humidity: " + forecast.list[i].main.humidity
      );

      newDiv.append(fDate, fIcon, forTemp, fHumid);
      $("#forecast-row").append(newDiv);
    }
  });
}
