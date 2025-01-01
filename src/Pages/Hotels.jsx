import React, { useEffect, useState } from 'react';
import HotelCard from '../Components/HotelCard';


const Hotels = () => {
    const [rooms, setRooms] = useState()
    useEffect(()=>{
        fetch('http://localhost:300/hotels')
        .then(res =>res.json())
        .then(data => setRooms(data))
    },[])

    return (
      <>
        <h1>All Rooms Are Waiting for You {rooms && rooms?.length}  </h1>
        <br />
           <section className='grid grid-cols-1 md:grid-cols-3  gap-5'>
            {
                rooms && rooms?.map((rooms, index)=><HotelCard key={index} rooms={rooms}/>)
            }
           </section>

      </>
    );
};

export default Hotels;