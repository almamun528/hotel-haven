import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ rooms }) => {
    const {
      title,
      size,
      view,
      guests,
      beds,
      bathrooms,
      description,
      family_friendly_amenities,
      room_amenities,
      image,
      _id
    } = rooms;
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="w-1/2">
          <img className="w-full" src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title"> {title} </h2>
          <p> Size : {size}</p>
          <p> View : {view}</p>
          <p> Beds : {beds}</p>
          <p> Guest : {guests}</p>
          <div className="card-actions">

            <Link to={`/hotels/${_id}`}>
              <button className="btn btn-primary">Book Now</button>
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelCard;