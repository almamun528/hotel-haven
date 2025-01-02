import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Provider/AuthContext";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";

const MyBooking = () => {
  const [myRoom, setMyRoom] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { user } = useContext(AuthContext);

  //   Load data which are match with users Email and Set into State
  useEffect(() => {
    fetch(`http://localhost:3000/myBooking?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyRoom(data);
      });
  }, [user?.email]);

  // console.log(myRoom, '  my all rooms ')

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  //! Delete function

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/myBooking/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            if (data.deletedCount) {
              // Remove the deleted item from the state
              setMyRoom((prevRooms) =>prevRooms.filter((room) => room._id !== id))
              Swal.fire({
                title: "Deleted!",
                text: "Your Booking Is Deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  //  Delete Function is closed

  // Form to collect the data
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;
    const myBookingId = selectedRoom.roomIdNumber;
    const review = {
      username: user.email,
      rating,
      comment,
      timestamp: new Date().toISOString(),
      roomId: selectedRoom._id,
      myBookingId,
    };

    //!send the review to backend by api
    fetch("http://localhost:3000/myBooking", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your feedback has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      });
    //  ! Review API ends
    // Delete API Starts
  };

  return (
    <>
      <h2 className="text-2xl text-center my-10">
        You Booked {myRoom && myRoom.length} Rooms
      </h2>

      <section className="my-10">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Room Name</th>
                <th>Your Email</th>
                <th>Number Of Bed</th>
                <th>Date</th>
                <th>Review</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myRoom &&
                myRoom.map((room, idx) => (
                  <tr className="bg-base-200" key={room._id}>
                    <th>{idx + 1}</th>
                    <td>{room.roomName}</td>
                    <td>{room.email}</td>
                    <td>{room.bed}</td>
                    <td>{formatDate(room.bookingDate)}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => {
                          setSelectedRoom(room);
                          setIsModalOpen(true);
                        }}
                      >
                        Review
                      </button>
                    </td>
                    <td className="text-red-500 text-xl font-bold cursor-pointer">
                      <button onClick={() => handleDelete(room._id)}>X</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && selectedRoom && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              Review for {selectedRoom.roomName}
            </h3>
            <form onSubmit={handleReviewSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  value={user.email}
                  className="input input-bordered"
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <Rating
                  initialValue={0}
                  size={25}
                  fillColor="#f59e0b"
                  className="mt-1"
                  required
                />
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  className="input input-bordered mt-2"
                  placeholder="Rating (1-5)"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Comment</span>
                </label>
                <textarea
                  name="comment"
                  className="textarea textarea-bordered"
                  placeholder="Write your comment here..."
                  required
                ></textarea>
              </div>
              <div className="form-control mt-4">
                <button className="btn btn-primary">Submit Review</button>
              </div>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default MyBooking;
