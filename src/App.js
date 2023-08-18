import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";

import Daily from "./Components/Daily";
import Forecast from "./Components/Forecast";
import Input from "./Components/input";
import TemperatureAndAll from "./Components/temperatureAndAll";
import TimeandLocation from "./Components/time&Location";
import TopButtons from "./Components/topButtons";
import  { getFormattedWeather } from "./Service/WeatherService";

function App() {
  const [query, setQuery] = useState({ q: "lucknow" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message  = query.q ? query.q : 'current location'
      toast.info('Fetching weather for '+ message)
      const data = await getFormattedWeather({ ...query, units });
      setWeather(data);
      toast.success("Successfully fetched weather for "+ data.name)
      // console.log(data)
    };
    fetchWeather();
  }, [query, units]);

  const background = ()=>{
    if(!weather) return "from-cyan-600 to-blue-800";
    const threshold = units === "metric"? 20:60;
    if(weather.temp<=threshold) {
      if(weather.details ==="Haze"){
        return "from-cyan-600 to-blue-800"
      } else if(weather.details==="Rain"){
        return "from-gray-400 to-black-200"
      } else if(weather.details=="Thunderstorm"){
        return "from-gray-800 to-black-800"
      }
      else return "from-cyan-600 to-blue-800";
    }else{
      if(weather.details==="Haze"){
        return "from-orange-400 to-black-200"
      } else if(weather.details==="Rain"){
        return "from dark-blue-400 to-black-500"
      } else if(weather.details==="Clouds"){
        return "from dark-blue-400 to gray-200 "
      }
      return "from-yellow-500 to-orange-800"
    }
  }

  return (
    <>
      <div
        className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-600 to-blue-800
    h-fit shadow-xl shadow-gray-400 ${background()}`}
      >
        <TopButtons setQuery = {setQuery} />
        <Input setQuery = {setQuery} units={units} setUnits={setUnits} />
        {weather && (
          <>
            <TimeandLocation weather={weather} />
            <TemperatureAndAll weather={weather} />
            <Forecast title="Hourly Forecast" items={weather.hourly}/>
            <Daily items={weather.groupedData} date={weather}/>
          </>
        )}
      </div>
      <ToastContainer autoClose={4000} theme="colored" newestOnTop={true} />
    </>
  );
}

export default App;
