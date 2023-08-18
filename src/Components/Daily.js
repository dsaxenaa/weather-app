import { formatToLocalTime, iconUrlFromCode } from "../Service/WeatherService";

import React from "react";

const Daily = ({items,date}) => {
    
    const {timezone} = date
    // console.log(items)

    function getMax(arr, attr) {
        return Math.max.apply(
          Math,
          arr.map((item) => item.main[attr])
        );
      }
      
      function getMin(arr, attr) {
        return Math.min.apply(
          Math,
          arr.map((item) => item.main[attr])
        );
      }

 
  return (
    <div>
      <div className="flex justify-start my-4">
        <p className="text-white font-medium uppercase">Daily forecast</p>
      </div>
      <hr className="my-1" />
      
        <div className="flex flex-row  items-center justify-between text-white ">
       
          {
            Object.keys(items).slice(1).map((i)=>{
                return(
                <div className='flex flex-col space-y-2 items-center justify-center mx-5 ' key={items[i][0].dt}>
                    <p className='text-sm font-light'>{formatToLocalTime(items[i][0].dt, timezone, "ccc")}</p>
                    <p className='text-light font-medium'>{getMax(items[i], 'temp_max').toFixed()}°</p>
                    <img src={iconUrlFromCode(items[i][0].weather[0].icon)} alt='' className='w-12'/>
                    <p className="font-medium">{items[i][0].weather[0].description}</p>
                    
                </div>
             ) })
          }
     
      </div>
      <hr className="my-2" />
    </div>
  );
};

export default Daily;
