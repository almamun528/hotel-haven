import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Provider/AuthContext";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const MyBooking = () => {
  const [myRoom, setMyRoom] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const { user } = useContext(AuthContext);



//   ! find the users booking rooms from Backend
  useEffect(() => {
      axios.get(`http://localhost:3000/myBooking?email=${user?.email}`,{withCredentials:true})
      .then(res=> setMyRoom(res.data))

  }, [user?.email]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/myBooking/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              setMyRoom((prevRooms) =>
                prevRooms.filter((room) => room._id !== id)
              );
              Swal.fire("Done!", "Your Booking Is Cancelled.", "success");
            }
          });
      }
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;
    const review = {
      username: user.email,
      rating,
      comment,
      timestamp: new Date().toISOString(),
      roomId: selectedRoom._id,
      myBookingId: selectedRoom.roomIdNumber,
    };

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
          setIsReviewModalOpen(false);
        }
      });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please select a new date.",
      });
    }


    fetch(`http://localhost:3000/update-booking/${selectedRoom._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newDate: selectedDate }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (0==0) {
        
          Swal.fire(
            "Updated!",
            "Booking date updated successfully!",
            "success"
          );
        }
      })
      .catch((error) => {
        console.error("Error updating booking date:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An error occurred.",
        });
      });
  };

  return (
    <>
      <h2 className="text-2xl text-center my-10">
        You Booked {myRoom?.length} Rooms
      </h2>
      <section className="my-10">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Room Name</th>
                <th>Email</th>
                <th>Number Of Bed</th>
                <th>Date</th>
                <th>Review</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {myRoom?.map((room, idx) => (
                <tr className="bg-base-200" key={room._id}>
                  <th>{idx + 1}</th>
                  <td>{room.roomName}</td>
                  <td>{user?.email}</td>
                  <td>{room.bed}</td>
                  <td>{formatDate(room.bookingDate)}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        setSelectedRoom(room);
                        setIsReviewModalOpen(true);
                      }}
                    >
                      Review
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        setSelectedRoom(room);
                        setIsUpdateModalOpen(true);
                        setSelectedDate(new Date(room.bookingDate));
                      }}
                    >
                      Update Date
                    </button>
                  </td>
                  <td className="text-red-500 text-xl font-bold cursor-pointer">
                    <button onClick={() => handleDelete(room._id)}> cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isReviewModalOpen && selectedRoom && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Leave a Review for {selectedRoom.roomName}
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="text"
                  value={user.email}
                  disabled
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <Rating
                  name="rating"
                  onClick={(rate) =>
                    (document.querySelector('input[name="rating"]').value =
                      rate)
                  }
                  allowHalfIcon={false}
                  size={30}
                  initialValue={0}
                  required
                />
                <input type="hidden" name="rating" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Comment</span>
                </label>
                <textarea
                  name="comment"
                  className="textarea textarea-bordered"
                  placeholder="Write your feedback here..."
                  required
                ></textarea>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit Review
                </button>
                <button
                  className="btn"
                  onClick={() => setIsReviewModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {isUpdateModalOpen && selectedRoom && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              Update Date for {selectedRoom.roomName}
            </h3>
            <form onSubmit={handleUpdateSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Date</span>
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <button className="btn btn-primary">Update Booking</button>
              </div>
            </form>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setIsUpdateModalOpen(false)}
              >
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