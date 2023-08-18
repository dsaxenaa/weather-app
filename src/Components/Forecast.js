import React from 'react'
import { iconUrlFromCode } from '../Service/WeatherService'

const Forecast = ({items}) => {
    
  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
            <p className='text-white font-medium uppercase'>hourly forecast</p>
        </div>
        <hr className='my-2'/>
        <div className='flex flex-row  items-center justify-between text-white '>
            {items.map((i)=>{
                return(
                <div className='flex flex-col space-y-2 items-center justify-center' key={i.date}>
                    <p className='text-sm font-light'>{i.date}</p>
                    <img src={iconUrlFromCode(i.icon)} alt='' className='w-12'/>
                    <p className='font-medium'>{`${i.temp.toFixed()}°`}</p>
                </div>

            )})}
        </div>
    </div>
  )
}

export default Forecast