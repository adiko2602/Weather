import { useState, useEffect, useCallback } from 'react'
import WeatherModule from './modules/WeatherModule';
import axios from 'axios'
import { WiDaySunny } from "react-icons/wi";

import './App.css';

const { REACT_APP_WEATHER_API_KEY } = process.env;

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [responseError, setResponseError] = useState(null);

  const handleInput = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(city) {
      setWeather(null);
      setResponseError(null);
      fetchWeather(city);
      setCity("");
    }
  }

  const setLocalCity = (city) => {
    localStorage.setItem('city', JSON.stringify(city));
    return;
  };

  const fetchWeather = useCallback(async (c) => {
    setLoading(true);
    await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${c}&lang=pl&appid=${REACT_APP_WEATHER_API_KEY}`,
    ).then((res) => {
      setWeather(res.data);
      setLocalCity(c);
    }).catch((err) => {
      setLocalCity("");
      setResponseError(err.response.data.message)
    })
    setLoading(false);
  }, [])

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem('city'));
    if (c) {
      fetchWeather(c);
    }
  }, [fetchWeather]);

  return (
    <div className='container'>
      <div className='header'>
        <div className='logo'>
          <WiDaySunny />
        </div>
        <div>
          Pogoda dla Twojego miejsca na ziemi
        </div>
      </div>
      <div className='search'>
        <form onSubmit={ handleSubmit }>
          <input placeholder="Miasto" type='text' aria-label='Miasto' onChange={ handleInput } value={ city }></input>
          <button type='submit'>Szukaj</button>
        </form>
      </div>
      <div className='spacer'>
        {loading ? <div className='loading'>Szukam miasto {city}...</div> : ""}
        {weather ? (<WeatherModule cityWeather={weather} />) : ""}
        {responseError ? <div className='error'>{responseError}</div> : ""}
      </div>
    </div>
  );
}

export default App;
