import React from 'react'

const TopButtons = ({setQuery}) => {

    const cities = [
        {
            id:1,
            title:"New Delhi"
        },
        {
            id:2,
            title:"London"
        },
        {
            id:3,
            title:"New York"
        },
        {
            id:4,
            title:"Paris"
        },
        {
            id:5,
            title:"Sydney"
        },
    ]
  return (
    <div>
        <div className='flex items-center justify-around my-6'>
            {cities.map((city)=>{
                return(
                    <>
                    <button key={city.id} className='text-white text-lg font-medium' onClick={()=>setQuery({q: city.title})}>{city.title}</button>
                    </>)
                })}

        </div>
    </div>
  )
}

export default TopButtons