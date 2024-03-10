import { useEffect, useState } from 'react';
import { useWeather } from './WeatherContext';
import Homepage from './Homepage';
import './App.css'

function App() {

const API_KEY = '282d6e25eee04199eb285a4484ee5e2d';
const { weatherData, setWeatherData,country, setCountry,city, setCity } = useWeather();
const [error, setError] = useState(null);
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      console.log(data?.city?.name,regionNames.of(data?.city?.country));
      setCity(data?.city?.name);
      setCountry(regionNames.of(data?.city?.country));
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(()=>{
  fetchWeatherData();
      // setWeatherData(data);
},[]);

  return (
    <div className='main-container w-[375px] h-[812px] rounded-xl'>
    <Homepage city={city} country={country} data={weatherData} />
    </div>
  )
}

export default App
