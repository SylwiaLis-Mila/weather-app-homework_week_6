// Feature #1
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
newFunction();

function newFunction() {
  dateElement.innerHTML = formatDate(currentTime);
}

// Feature #2
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Show searched location//

function showTemp(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  cityElement.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${temperature}`;

  // To change humidity and wind und description

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind speed: ${wind} m/s`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
}

function showCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input").value;
  let apiKey = "f58a3da8d9e0f160ba2b997349a49f23";
  let appUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;

  axios.get(appUrl).then(showTemp);
}
let newCity = document.querySelector("#submit");
newCity.addEventListener("click", showCity);

//to celsius

function celsiusConversion(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusConversion);

// to fahrenheit

function fahrenheitConversion(event) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitConversion);

//Show current location//

function showCurrentLocationTemp(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  cityElement.innerHTML = `${cityName}`;
  temperatureElement.innerHTML = `${temperature}`;

   let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind speed: ${wind} m/s`;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
}


function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f58a3da8d9e0f160ba2b997349a49f23";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showCurrentLocationTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentLocation);
