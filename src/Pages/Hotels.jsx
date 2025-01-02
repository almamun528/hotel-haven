import React, { useEffect, useState } from 'react';
import HotelCard from '../Components/HotelCard';


const Hotels = () => {
    const [rooms, setRooms] = useState()
    useEffect(()=>{
        fetch('http://localhost:3000/hotels')
        .then(res =>res.json())
        .then(data => setRooms(data))
    },[])

    return (
      <>
       
           <section className='grid grid-cols-1 md:grid-cols-3 md:my-20 gap-5'>
            {/*  */}
            {
                rooms && rooms?.map((rooms, index)=><HotelCard key={index} rooms={rooms}/>)
            }
           </section>

      </>
    );
};

export default Hotels;