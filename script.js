var cities = [];
var m = moment().format("MMMM Do YYYY");
var cal = moment(m).format("MM/DD/YYYY");
console.log(cal);

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
    //var cityDiv = "<div class = 'city'>";
    console.log(response);
    var k = response.main.temp;
    var f = ((k - 273.15) * 9) / 5 + 32;

    var formatDate = response.dt;

    var responseDate = moment(formatDate).format("MM/DD/YYYY");
    $("#city-name").text(city + " " + responseDate);
    $("#today-temp").text(f.toFixed(2) + "°F");
    $("#today-humid").text(response.main.humidity + "%");
    $("#today-wind").text(response.wind.speed + "Mph");
  });

  var queryTWO =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=e935932a7a61cfd6e86777324be7ec1a";

  $.ajax({
    url: queryTWO,
    method: "GET"
  }).then(function(forecast) {
    console.log(queryTWO);
    console.log(forecast);
    console.log(forecast.list[0].main.temp);
    console.log(forecast.list[0].main.humidity);
    for (var i = 0; i < 5; i++) {
      var forecastDate = forecast.list[i].dt;

      var forDate = moment(forecastDate).format("MM/DD/YYYY");
      var kel = forecast.list[i].main.temp;
      var fTemp = ((kel - 273.15) * 9) / 5 + 32;
      var newDiv = $("<div class ='future'>");
      var fDate = $("<div>").text(forDate);
      var fIcon = $("<div>").text("icon");
      var forTemp = $("<div>").text("Temp: " + fTemp.toFixed(2) + "°F");
      var fHumid = $("<div>").text(
        "Humidity: " + forecast.list[i].main.humidity
      );
      newDiv.append(fDate, fIcon, forTemp, fHumid);
      $("#forecast-row").append(newDiv);
      console.log("working?");
    }
  });
}

$("#add-city").on("click", function(event) {
  event.preventDefault();
  var city = $("#city-input")
    .val()
    .trim();
  cities.push(city);
  renderButtons();
});

$(document).on("click", ".city-btn", displayCityInfo);

/*
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=e935932a7a61cfd6e86777324be7ec1a";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(queryURL);
  console.log(response);
  console.log(response.main.temp;
  console.log(response.main.temp);
  console.log(response.main.humidity);
  console.log(response.wind.speed);
  console.log("----------");
});

var queryTWO =
  "https://api.openweathermap.org/data/2.5/forecast?q=London&appid=e935932a7a61cfd6e86777324be7ec1a";

$.ajax({
  url: queryTWO,
  method: "GET"
}).then(function(forecast) {
  console.log(queryTWO);
  console.log(forecast);
  console.log(forecast.list[0].main.temp);
  console.log(forecast.list[0].main.humidity);
});
*/
