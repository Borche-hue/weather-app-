import './css/style.css';
import React, { useState } from 'react';

const api = {
  key: "c9a4dba742158478b3023d31040fa8b3",
  base: "https://api.openweathermap.org/data/2.5"
}

function App() {

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"]
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let day = days[d.getDay() - 1];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day}, ${date}, ${month}, ${year}`
  }

  const nextDayDate = (d) => {
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let day = days[d.getDay()];

    return `${day}`
  }

  const dayAfterTommorow = (d) => {
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let day = days[d.getDay() + 1];

    return `${day}`
  }

  const dayAfterAfterTommorow = (d) => {
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let day = days[d.getDay() + 2];

    return `${day}`
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([])
  const [forecast, setForecast] = useState([])

  const search = (evt) => {
    if(evt.key === "Enter"){
    fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
     .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result)
        });
        if (typeof weather.main !== 'undefined') {
        fetch(`${api.base}/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=${api.key}`)
          .then(res => res.json())
          .then(result => {
            setForecast(result)
            console.log(result)
          })
      }
  }
}


  return (
    <div className={(typeof weather.main !== "undefined") ? (weather.weather[0].main === 'Rain') ? 'App-rainy' : (weather.weather[0].main === 'Clouds' ) ? 'App-cloudy' : 'App' : 'App'}>
      <div className="weather-app">
        <div className="search-bar">
          <input
            onChange={e => setQuery(e.target.value)}
            value={query}
            className="search"
            type="text"
            placeholder="Search city..."
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== 'undefined') ?
          <div className="weather-div">
            <div className={(weather.weather[0].main === 'Clear') ? 'weather-clear' : (weather.weather[0].main === 'Rain') ? 'weather-rain' : (weather.weather[0].main === 'Clouds') ? 'weather-clouds' : '' }></div>
            <div className="weather-info">
              <div className="weather-city">{weather.name}, {weather.sys.country}</div>
              <div className="weather-date">{dateBuilder(new Date())}</div>
              <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather-stat">{weather.weather[0].main}</div>
            </div>
          </div>

          : ('')}
          {(typeof forecast.current !== 'undefined') ? (
        <div className="forecast-3days">
          <div className="forecast-text">Forecast for the next 3 days:</div>
          
            <div className="weather-forecast">

              <div className="tommorow">

                <div className={(typeof forecast.current !== 'undefined') ? (forecast.daily[0].weather[0].main === 'Clear') ? 'tommorow-sunny' : (forecast.daily[0].weather[0].main === 'Rain') ? 'tommorow-rain' : (forecast.daily[0].weather[0].main === 'Clouds') ? 'tommorow-clouds' : '' : ''}>
                </div>
                <div className="tommorow-day">{nextDayDate(new Date())}</div>
                <div className="tommorow-temp">{Math.round(forecast.daily[0].temp.day)}°C</div>
                <div className="tommorow-stat">{forecast.daily[0].weather[0].main}</div>
              </div>

              <div className="tommorow">
                <div className={(typeof forecast.current !== 'undefined') ? (forecast.daily[1].weather[0].main === 'Clear') ? 'tommorow-sunny' : (forecast.daily[1].weather[0].main === 'Rain') ? 'tommorow-rain' : (forecast.daily[1].weather[0].main === 'Clouds') ? 'tommorow-clouds' : '' : ''}>
                </div>
                <div className="tommorow-day">{dayAfterTommorow(new Date())}</div>
                <div className="tommorow-temp">{Math.round(forecast.daily[1].temp.day)}°C</div>
                <div className="tommorow-stat">{forecast.daily[1].weather[0].main}</div>
              </div>

              <div className="tommorow">
                <div className={(typeof forecast.current !== 'undefined') ? (forecast.daily[2].weather[0].main === 'Clear') ? 'tommorow-sunny' : (forecast.daily[2].weather[0].main === 'Rain') ? 'tommorow-rain' : (forecast.daily[2].weather[0].main === 'Clouds') ? 'tommorow-clouds' : '' : ''}>
                </div>
                <div className="tommorow-day">{dayAfterAfterTommorow(new Date())}</div>
                <div className="tommorow-temp">{Math.round(forecast.daily[2].temp.day)}°C</div>
                <div className="tommorow-stat">{forecast.daily[2].weather[0].main}</div>
              </div>
            </div>
          
        </div>
        ) : ('')}
      </div>
    </div>
  );
}

export default App;