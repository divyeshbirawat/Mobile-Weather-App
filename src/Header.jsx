import { useEffect, useState } from "react";

export default function Header({ page }) {
  const now = new Date();

  const [minutes, setMinutes] = useState(now.getMinutes());
  const [hours, setHours] = useState(now.getHours());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      setHours(currentTime.getHours());
      setMinutes(currentTime.getMinutes());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (page === 'homepage') {
    return (
      <div className="flex justify-between cursor-default relative top-[-1rem]">
        <span className="time text-black">{hours}:{minutes}</span>
        <div className="status-bar flex gap-x-[0.5rem]">
          <img src="./src/assets/CellularConnection-black.svg" alt="network" />
          <img src="./src/assets/Wifi-black.svg" alt="wifi" />
          <img src="./src/assets/Battery-black.svg" alt="battery" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between cursor-default relative">
        <span className="time text-white">{hours}:{minutes}</span>
        <div className="status-bar flex gap-x-[0.5rem]">
          <img src="./src/assets/CellularConnection.svg" alt="network" />
          <img src="./src/assets/Wifi.svg" alt="wifi" />
          <img src="./src/assets/Battery.svg" alt="battery" />
        </div>
      </div>
    );
  }
}
