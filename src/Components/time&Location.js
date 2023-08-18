import React from 'react'
import { formatToLocalTime } from '../Service/WeatherService'

const TimeandLocation = ({weather}) => {
  // console.log(weather.dt)
  // const date = new Date(weather.dt)
  // console.log(date)
  return (
    <div>
        <div className='flex items-start justify-center my-6'>
            <p className='text-white text-xl font-light'>{formatToLocalTime(weather.dt, weather.timezone)}</p>
            {/* {console.log(new Date(weather.dt))} */}
            {/* <p className='text-white text-xl font-light'>{date}</p> */}
        </div>
        <div className='flex items-start justify-center my-3'>
            <p className='text-white text-3xl font-medium'>{weather.name}, {weather.country}</p>
        </div>
    </div>
  )
}

export default TimeandLocation