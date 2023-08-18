import React, { useState } from "react";
import { UilLocationPoint, UilSearch } from "@iconscout/react-unicons";

import {toast} from 'react-toastify';

const Input = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");

  const handleUnit = (e) => {
    const selectedUnit = e.target.name;
    if(units !==selectedUnit){
      setUnits(selectedUnit)
    }
  };

  const handleSearch = () => {
    if (city !== "") {
      setQuery({ q: city });
      setCity("");
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      // toast.info("Fetching users location")
      navigator.geolocation.getCurrentPosition((p) => {
        let lat = p.coords.latitude;
        let lon = p.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-normal space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Search place..."
          className="text-xl font-light p-2 w-full shadow-lg focus:ouline-none capitalize placeholder:lowercase"
        />
        <UilSearch
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          size={30}
          onClick={handleSearch}
        />
        <UilLocationPoint
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          size={30}
          onClick={handleLocation}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-dark hover:scale-125 transition ease-out"
          onClick={handleUnit}
        >
          °C
        </button>
        <p className="text-xl text-white font-light mx-1"> | </p>
        <button
          className="text-xl text-white font-dark hover:scale-125 transition ease-out"
          name="imperial"
          onClick={handleUnit}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Input;
