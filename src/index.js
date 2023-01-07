const apiKey = 'ca35573e56f9c2d39e2edcd6425fd8b7'
const gateway = 'https://api.openweathermap.org/data/2.5/weather'
const temperature = document.getElementById('temperature')
const city = document.querySelector('.city')
const dayInfo = document.querySelector('.day-date')
const description = document.querySelector('.description')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const icon = document.querySelector('.icon')
const searchForm = document.querySelector('#search-form')
const cityInput = document.querySelector('#city-input')
const fahrenheit = document.querySelector('.fahrenheeit')
const celsius = document.querySelector('.celsius')

let celsiusTemp = null

function search(city) {
    let indexUrl = `${gateway}?q=${city}&appid=${apiKey}&units=metric`
    axios.get(indexUrl).then(displayTemperature)
}

search('New Delhi')

function displayTemperature(response) {
    temperature.innerText = Math.round(response.data.main.temp)
    humidity.innerText = `Humidity: ${response.data.main.humidity}%`
    wind.innerText = `Wind: ${Math.round(response.data.wind.speed)} km/h`
    city.innerText = response.data.name
    dayInfo.innerText = formatDate(response.data.dt * 1000)
    description.innerText = (response.data.weather[0].description)
    console.log(response.data)
    icon.setAttribute('src', `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    icon.setAttribute('alt', `${response.data.weather[0].description}`)
    celsiusTemp = Math.round(response.data.main.temp)
    getForecast(response.data.coord)
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000)
    let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let day = weekdays[date.getDay()]
    return day
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function formatDate(timestamp) {
    let date = new Date(timestamp)
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    let hours = date.getHours()
    let day = days[date.getDay()]
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (hours < 10) {
        hours = `0${hours}`
    }
    dayTime = `Last updated at: ${day} ${hours}:${minutes}`
    return dayTime
}


function displayForecast(response) {
    let weatherForecast = document.querySelector('.weather-forecast')
    let forecastResponse = response.data.daily
    let forecastBody = `<div class="row">`
        forecastResponse.forEach(function (forecast, stopIndex) {
            if (stopIndex < 5) {
                forecastBody = forecastBody +
                    `
        <div class="col-2">
            <div class="weather-forecast-day">${formatDay(forecast.dt)}</div>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather-icon" width="44">
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(forecast.temp.max)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(forecast.temp.min)}°</span>
            </div>
        </div>`
            }
        })
    forecastBody = forecastBody + `</div>`
    weatherForecast.innerHTML = forecastBody
    console.log(forecastBody)

}

searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault()
    search(cityInput.value)
}

fahrenheit.addEventListener('click', getFahrenheit)
celsius.addEventListener('click', getCelsius)

function getFahrenheit(e) {
    e.preventDefault()
    celsius.classList.remove('active')
    fahrenheit.classList.add('active')
    let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32
    temperature.innerText = Math.round(fahrenheitTemperature)
}

function getCelsius(e) {
    e.preventDefault()
    celsius.classList.add('active')
    fahrenheit.classList.remove('active')
    temperature.innerText = celsiusTemp
}