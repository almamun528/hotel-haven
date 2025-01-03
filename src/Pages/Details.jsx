import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AuthContext from "../Provider/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import Datepicker CSS
import Swal from "sweetalert2";

const Details = () => {
  const hotelData = useLoaderData();
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  // ! Get All reviews data from backend
  useEffect(() => {
    fetch("https://hotel-server-chi.vercel.app/user-reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  // console.log(reviews)
  // Data Load is Closed 
  
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const UserEmail = user?.email;
  const price = 200;
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
 

const userReviews = reviews.filter((review) => review.myBookingId === _id);

  const handleBookingForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const myEmail = UserEmail;
    const roomName = title;
    const bed = beds;
    const pricePerNight = form.price.value;
    const phoneNumber = form.phone.value;
    const roomIdNumber = _id 
    // Booking Data
    const bookedRoom = {
      myEmail,
      roomName,
      bed,
      pricePerNight,
      phoneNumber,
      roomIdNumber,
      bookingDate: selectedDate, // Include the selected date
    };
    

    // ? Send the Booking Data to the dataBase
    fetch("https://hotel-server-chi.vercel.app/hotel-booking", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookedRoom),
    })
      .then((res) => {
        // console.log(res); // Log response to check headers and status
        return res.json();
      })
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Room Is Booked For You",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error); // Catch and log any errors
      });
      
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
      <br />
      {/* User review Section */}

      <section className="my-3">
        <h2>User Reviews:</h2>
        {userReviews && userReviews.length > 0 ? (
          userReviews.map((rev) => (
            <main
              key={rev._id}
              className="p-4 bg-gray-100 my-2 rounded grid grid-cols-1 md:grid-cols-3"
            >
              <p>
                <strong>User Email:</strong> {rev.username}
              </p>
              <p>
                <strong>Rating:</strong> {rev.rating} Out of 5
              </p>
              <p>
                <strong>Comment:</strong> {rev.comment}
              </p>
              <p>
                <small>{new Date(rev.timestamp).toLocaleString()}</small>
              </p>
            </main>
          ))
        ) : (
          <>
            <p className="text-red-500">No reviews found for this hotel.</p>
            <span className="text-green-500">
              Please Book a Room and Go to My Booking Page You Might get the
              option to review
            </span>
          </>
        )}
      </section>
    </>
  );
};

export default Details;
