import { DateTime } from "luxon";

const API_KEY = "9ef90e82fe6d9a1efa26eee6e6008077";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=26.85&lon=80.9167&exclude=current,minutely,hourly,alerts&appid=ef90e82fe6d9a1efa26eee6e6008077&units=metric

//api.openweathermap.org/data/2.5/forecast?lat=26.85&lon=80.9167&appid=9ef90e82fe6d9a1efa26eee6e6008077
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  //   console.log(url);

  return fetch(url).then((res) => res.json());
};

const formatWeather = (data) => {
  // console.log(data)
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    timezone,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    speed,
    details,
    icon,
    timezone,
  };
};

const formatForecast = (data) => {
  // console.log(data.list)
  const groupedData = data.list.reduce((days, row) => {
    const date = row.dt_txt.split(" ")[0];
    days[date] = [...(days[date] ? days[date] : []), row];
    return days;
  }, {});

};

export const getFormattedWeather = async (searchParams) => {
  const formattedData = await getWeatherData("weather", searchParams).then(
    formatWeather
  );

  const { lat, lon, timezone } = formattedData;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    exclude: "current, minutely, alerts",
    units:"metric",
  });

  
  const groupedData = formattedForecastWeather.list.reduce((days, row) => {
    const date = row.dt_txt.split(" ")[0];
    days[date] = [...(days[date] ? days[date] : []), row];
    return days;
  }, {});

  
//   for(let date of Object.keys(groupedData)){
//     console.log('Date:', date); 
//     // current date -> date
//     // original items array for this date -> groupedData[date]
//     console.log('RowCount:', groupedData[date].length);
//     console.log('MaxTemp:', getMax(groupedData[date], 'temp_max'));
//     console.log('MinTemp:', getMin(groupedData[date], 'temp_min'));
//     console.log('MaxHumidity:', getMax(groupedData[date], 'humidity'));
    
//     console.log('\n\n');
//   }

  const hourly = formattedForecastWeather.list.slice(1,6).map((i)=>{
    return{
        date:formatToLocalTime(i.dt, timezone, 'hh:mm a'),
        temp:i.main.temp,
        icon:i.weather[0].icon
    }
})


  return {...formattedData, hourly, groupedData};
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(secs).toFormat(format);

// function getMax(arr, attr) {
//   return Math.max.apply(
//     Math,
//     arr.map((item) => item.main[attr])
//   );
// }

// function getMin(arr, attr) {
//   return Math.min.apply(
//     Math,
//     arr.map((item) => item.main[attr])
//   );
// }



const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;


export { formatToLocalTime, iconUrlFromCode };