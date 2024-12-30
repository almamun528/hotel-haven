import React from 'react';

const HotelCard = ({ rooms }) => {
    const {
      title,
      size,
      view,
      guest,
      beds,
      bathrooms,
      description,
      family_friendly_amenities,
      room_amenities,
      image
    } = rooms;
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className='w-1/2'>
          <img className='w-full' src={image} alt={title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">  {title} </h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
                Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelCard;