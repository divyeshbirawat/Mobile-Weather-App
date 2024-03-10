import { useState, useEffect } from 'react';
import { useWeather } from './WeatherContext';


const CityDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
const { weatherData, setWeatherData,country, setCountry,city, setCity } = useWeather();
  const API_KEY = '282d6e25eee04199eb285a4484ee5e2d';
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  const fetchCities = async () => {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&appid=${API_KEY}&units=metric`);
          if (!response.ok) {
            alert('Failed to fetch cities');  
            throw new Error('Failed to fetch cities');
          }
          let data = await response.json();
          setWeatherData(data);
                setCity(data?.city?.name);
      setCountry(regionNames.of(data?.city?.country));
        } catch (error) {
          console.error(error.message);
        }
      };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
    const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchCities();
    }
  };

  return (
    <div className='border absolute top-[3.3rem] right-[4rem] text-black'>
      <input
        type="text"
        placeholder="Search for a city"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className='bg-white border-white'
      />
    </div>
  );
};

export default CityDropdown;
