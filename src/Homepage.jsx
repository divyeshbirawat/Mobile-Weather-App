import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from './WeatherContext';
import Header from "./Header";
import Footer from "./Footer";
import WeatherModal from './WeatherModal';
import CityDropdown from './CityDropdown';

const popupVariants = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const weatherType = {
  "rain" : './src/assets/weather-cloud-thunder-rain.svg',
  "clouds" : './src/assets/weather-clouds.svg',
  "snow" : './src/assets/weather-sun.svg',
}
function getWeather(value) {
let imageSrc = '';
switch (value) {
  case 'rain':
    imageSrc = weatherType.rain;
    break;
  case 'clouds':
    imageSrc = weatherType.clouds;
    break;
  case 'snow':
    imageSrc = weatherType.snow;
    break;
  default:
    imageSrc = weatherType.snow;
}
return imageSrc;
}


export default function Homepage({ city, country }) {
  const { weatherData, setWeatherData } = useWeather();
const [selectedId, setSelectedId] = useState(null)
const [todaysWeather, setTodaysWeather] = useState([]);
const [showTextbox, setShowTextbox] = useState(false);

const options = { year: 'numeric', month: 'short', day: 'numeric' };
const currentDate = new Date().toLocaleDateString('en-US', options);

console.log(currentDate);

const closeModal = () => {
  setSelectedId(0);
}


useEffect(()=>{

const now = new Date();

const isAfterOrEqual = (dt_txt, referenceDate) => {
  const entryDate = new Date(dt_txt);
  return entryDate >= referenceDate;
};
if (weatherData) {
const startIndex = weatherData?.list?.findIndex(entry => isAfterOrEqual(entry.dt_txt, now));


const endIndex = Math.min(startIndex + 5, weatherData?.list?.length);

const relevantEntries = weatherData?.list?.slice(startIndex, endIndex);
setTodaysWeather(relevantEntries);
}

},[weatherData])


  return (
    <div className="bg-white rounded-2xl h-full p-[2rem] pb-[4px] relative">
      <Header page="homepage" />
      {showTextbox ? <CityDropdown /> : null}
      <div className="homepage-container">
        <div className="hamburger-and-search flex justify-between">
          <img src="./src/assets/hamburger-icon.svg" alt="hamburger" />
          <img src="./src/assets/search-icon.svg" alt="search" className='cursor-pointer' onClick={()=>setShowTextbox(!showTextbox)} />
        </div>
        <div className="weather-info flex justify-between my-[3rem]">
          <div className="city-and-weather-info flex flex-col text-left">
            <span className="text-black text-[25px] font-bold leading-[29px]">
              {city},<br />
              {country}
            </span>
            <span className="text-[#96969A]">{currentDate}</span>
            <span className="text-[#057BFF] flex">
              <img
                src="./src/assets/weather-clouds-blue.svg"
                alt="image"
                className="h-[24px] w-[17px] object-cover scale-[1.5] mr-1"
              />
              {todaysWeather?.length ? todaysWeather[0].weather[0].main : null}
            </span>
          </div>
          <div className="weather-view relative w-[130px] h-[111px] cursor-pointer">
            <div onClick={() => setSelectedId(1)}>
              <img
                className=" rounded-xl"
                src="./src/assets/ny-mini-view.png"
                alt=""
              />
              <span className="bg-[#FF2D55] p-1 rounded-[7px] cursor-default relative bottom-[2.3rem] right-[-2.4rem]">
                LIVE
              </span>
            </div>
            <AnimatePresence>
              {selectedId && (
                <motion.div
                className="backdrop absolute top-[-7.7rem] right-[-2rem] z-10"
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={closeModal}
                >
                  <WeatherModal city={city} country={country} closeModal={closeModal}/>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="additional-info text-left">
          <span className="text-black font-bold">Additional Info</span>
          <div className="rounded-xl mt-[1rem] bg-[#003339] w-full h-[92px] flex">
          {
            todaysWeather?.length ? todaysWeather.map((entry, i) => {
              const date = new Date(entry.dt_txt);
              const day = date.getDate().toString().padStart(2, '0');
              const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
              return (
                <div className="current w-[64px] flex flex-col justify-center items-center relative rounded-xl" key={i}  style={i === 0 ? {background: "linear-gradient(180deg, rgba(255, 255, 255, 0.0001) 0%, rgba(255, 255, 255, 0.100169) 100%)"} : {}}>
                  <span className="time">{time}</span>
                  <img
                    className={`${entry.weather[0].main.toLowerCase() === 'clouds' ? 'scale-[3] ' : 'scale-[1.5] '} weather-image w-[12px] h-[12px] m-2`}
                    src={getWeather(entry.weather[0].main.toLowerCase())}
                    alt="image"
                  />
                  <span className="date">{day}</span>
                </div>
              );
            }) : null
          }

          </div>
        </div>

        <div className="future-weather my-16">
          <span className="h-[1px] mt-[2rem] mb-[1rem] w-full block bg-[#F1F1F3]"></span>
          <div className="weather-info h-[64px] flex gap-x-2 text-black items-center justify-between">
            <div className="col-1 flex flex-col">
              <span className="font-normal text-[13px] leading-[15.34px] text-[#96969a]">
                Percipitation
              </span>
              <span>{todaysWeather?.length ? `${todaysWeather[0]?.rain?.['3h']}%` : '-'}</span>
            </div>
            <div className="col-2 flex flex-col">
              <span className="font-normal text-[13px] leading-[15.34px] text-[#96969a]">
                Humidity
              </span>
              <span>{todaysWeather?.length ? `${todaysWeather[0].main.humidity}%` : '-'}</span>
            </div>
            <div className="col-3 flex flex-col">
              <span className="font-normal text-[13px] leading-[15.34px] text-[#96969a]">
                Windy
              </span>
              <span>{todaysWeather?.length ? `${todaysWeather[0].wind.speed}km/h` : '-' }</span>
            </div>
          </div>
          <span className="h-[1px] mb-[2rem] mt-[1rem] w-full block bg-[#F1F1F3]"></span>
        </div>
      </div>
      <img src='./src/assets/Temp.png' className='relative top-[-4rem] py-[5px] w-[375px]' alt="THIS SECTION WAS ADDED LATER BY PALLAVI KUMAR AND WAS NOT THERE BEFORE- WHEN WE GOT THE DESIGN LINK HENCE I JUST ADDED AN IMAGE " />
      <Footer page="homepage" />
    </div>
  );
}
