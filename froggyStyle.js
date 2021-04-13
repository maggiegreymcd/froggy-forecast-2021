function formatDate(timestamp) {

    let date = new Date(timestamp);

    let hours = date.getHours();
    
    if (hours < 10) {
        hours = `0${hour}`;
    };

    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = `0${minutes}`
    };

    let day = date.getDay();

      let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

  let formattedDay = days[(day)]

    return `${formattedDay} ${hours}:${minutes}`;
}

function displayWeather(response) {
    let locationToUser = document.querySelector("#currentLocation");
    locationToUser.innerHTML = response.data.name;

    let weatherDescriptionToUser = document.querySelector("#weatherDescription");
    weatherDescriptionToUser.innerHTML = response.data.weather[0].description;
    
    let tempToUser = document.querySelector("#currentTemp");
    tempToUser.innerHTML = Math.round(response.data.main.feels_like);

    let humidityToUser = document.querySelector("#humidity");
    humidityToUser.innerHTML = Math.round(response.data.main.humidity);

    let windSpeedToUser = document.querySelector("#windSpeed");
    windSpeedToUser.innerHTML = Math.round(response.data.wind.speed);

    let dateAndTimeToUser = document.querySelector("#dayAndTime");
    dateAndTimeToUser.innerHTML = formatDate(response.data.dt * 1000);

    let weatherID = response.data.weather[0].id;

    if (weatherID === 800) {
        //** Summer froggy */
        let frogImage = document.querySelector("#frog");
        frogImage.setAttribute("src", `FroggySummer.png`);
    }

    if (weatherID >= 801) {
        //** Standard froggy */
        let frogImage = document.querySelector("#frog");
        frogImage.setAttribute("src", `Froggy.png`);
    }

    if (weatherID >= 700 && weatherID <= 781 ) {
        //** Froggy taking shelter */
    }

    if (weatherID >= 600 && weatherID <= 622) {
        //** Snow froggy */
        let frogImage = document.querySelector("#frog");
        frogImage.setAttribute("src", `FroggyWinter.png`);
    }

    if (weatherID >= 200 && weatherID <= 531) {
        //** Rain froggy */
        let frogImage = document.querySelector("#frog");
        frogImage.setAttribute("src", `FroggyRain.png`);
    }
}

//** Search engine */

function search (city) {

let apiKey = "3fdbb0c1f67069bd33e76ea8a1295d83";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayWeather);

};

function handleSubmit(event) {
    event.preventDefault();
    let userLocation = document.querySelector("#userLocationInput");
    search(userLocation.value);
};

let searchForm = document.querySelector("#submitLocation");
searchForm.addEventListener("submit", handleSubmit);