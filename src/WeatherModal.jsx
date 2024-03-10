import { useEffect } from "react";
import PropTypes from 'prop-types';
import Header from "./Header";
import Footer from "./Footer";

const styles = {
  currentLocation: {
    fontWeight: "700",
    fontSize: "45px",
    lineHeight: "60px",
    letterSpacing: ".45px",
  }
}

export default function WeatherModal({city, country, closeModal}) {

useEffect(()=>{
},[city, country]);

  return (
    <div className="w-[376px] h-[814px] bg-[url(./src/assets/bg-nyc.png)] bg-no-repeat bg-cover rounded-2xl px-2">
    <Header />
      <div className="pt-4 flex justify-between">
        <img src="./src/assets/close-icon.svg" alt="close" className="w-[24px] cursor-pointer" onClick={() => closeModal()} />
        <span className="bg-[#FF2D55] p-2 rounded-[7px] cursor-default">LIVE</span>
      </div>
      <div className="location relative top-[6rem]">
      <div  className="location relative top-[2rem] pl-[2rem] flex items-center gap-x-[1rem]"><img src="./src/assets/location-icon.svg" alt="current location"/><span className="pl-1">CURRENT LOCATION</span></div>

      <div className="flex flex-col pl-[2rem] text-left relative top-[5rem]">
        <h1 className="city" style={styles.currentLocation}>{city},</h1>
        <h2 className="country" style={styles.currentLocation}>{country}</h2>
      </div>
      </div>
      <Footer page={'modal'} />
    </div>
  )
}

WeatherModal.PropTypes = {
  city: PropTypes.string,
  country: PropTypes.string
}

