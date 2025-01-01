import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AuthContext from "../Provider/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import Datepicker CSS

const Details = () => {
  const hotelData = useLoaderData();
  const { user } = useContext(AuthContext);
  const UserEmail = user?.email;
  const price = 200;

  const [selectedDate, setSelectedDate] = useState(new Date()); // State for date picker

// ? DeStructure the Object 
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
    _id,
  } = hotelData;

  const handleBookingForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = UserEmail;
    const roomName = title;
    const bed = beds;
    const pricePerNight = form.price.value;
    const phoneNumber = form.phone.value
    const bookedRoom = {
      email,
      roomName,
      bed,
      pricePerNight,
      phoneNumber,
      bookingDate: selectedDate, // Include the selected date
    };
    console.log(bookedRoom);
  };

  return (
    <>
      <section className="my-5">
        <div className="card lg:card-side bg-base-100 shadow-xl border-2 p-2">
          <figure>
            <img src={image} alt={title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title"> {title} </h2>
            <p>
              <b> Description : </b> {description}
            </p>
            <div className="space-y-2">
              <h2 className="text-blue-500 font-bold">Room Details</h2>
              <p>
                {" "}
                <b>Beds : </b> {beds}{" "}
              </p>
              <p>
                {" "}
                <b>View : </b> {view}{" "}
              </p>
              <p>
                {" "}
                <b>Size : </b> {size}{" "}
              </p>
              <p>
                <b>Guests :</b> {guests}{" "}
              </p>
              <p>
                {" "}
                <b>Bath Room : </b> {bathrooms}{" "}
              </p>
              <p>
                {" "}
                <b>Room Amenities : </b> {room_amenities}{" "}
              </p>
              <p>
                <b> Family Friendly Amenities : </b> :{" "}
                {family_friendly_amenities}{" "}
              </p>
            </div>
            <div className="card-actions justify-end">
              {/* The button to open modal */}
              <label htmlFor="my_modal_7" className="btn btn-primary">
                Book Now
              </label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my_modal_7" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box">
                  <h3 className="text-lg font-bold text-center">
                    Book Now & See My Booking!
                  </h3>
                  {/*  */}
                  <main>
                    <form onSubmit={handleBookingForm} className="card-body">
                      <div className="form-control">
                        <label className="label">
                          {/* User Email */}
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="email"
                          defaultValue={UserEmail}
                          placeholder="You Have To Put Your User Email"
                          className="input input-bordered"
                          required
                        />
                      </div>
                      {/* Room Title */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Room Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Room Name"
                          className="input input-bordered"
                          defaultValue={title}
                          required
                        />
                      </div>
                      {/* Beds  */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Beds</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Beds "
                          className="input input-bordered"
                          defaultValue={beds}
                          required
                        />
                      </div>
                      {/* Price  */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">$ Price</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Price"
                          className="input input-bordered"
                          defaultValue={price}
                          required
                          name="price"
                        />
                      </div>
                      {/* Phone Number  */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Phone Number</span>
                        </label>
                        <input
                          type="number"
                          placeholder="phone number"
                          className="input input-bordered"
                          
                          required
                          name="phone"
                        />
                      </div>
                      {/* Date Picker */}
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Date</span>
                        </label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          className="input input-bordered"
                          dateFormat="yyyy-MM-dd"
                          required
                        />
                      </div>

                      <div className="form-control mt-6">
                        <button className="btn btn-primary">Confirm</button>
                      </div>
                    </form>
                  </main>
                  {/*  */}
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
