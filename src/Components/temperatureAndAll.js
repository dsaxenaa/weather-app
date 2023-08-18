import {
  UilArrowDown,
  UilArrowUp,
  UilSun,
  UilSunset,
  UilTear,
  UilTemperature,
  UilWind,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../Service/WeatherService";

import React from "react";

const TemperatureAndAll = ({ weather }) => {
  return (
    <div>
      <div className="flex items-center justify-center py-4 text-2xl text-white">
        <p>{weather.details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(weather.icon)} alt="" className="w-25" />
        <p className="text-4xl">{`${weather.temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-3">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={20} className="mr-1" />
            Real Feel:{" "}
            <span className="text-white font-medium ml-1">{`${weather.feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={20} className="mr-1" />
            Humidity:{" "}
            <span className="text-white font-medium ml-1">{`${weather.humidity}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={20} className="mr-1" />
            Wind:{" "}
            <span className="text-white font-medium ml-1">{`${weather.speed.toFixed()} km/hr`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <UilSun />
        <p className="font-light">
          Rise:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(weather.sunrise, weather.timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">
          Set:{" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(weather.sunset, weather.timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilArrowUp />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${weather.temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowDown />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${weather.temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureAndAll;
