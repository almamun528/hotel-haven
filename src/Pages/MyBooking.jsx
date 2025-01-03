import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Provider/AuthContext";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyBooking = () => {
  const [myRoom, setMyRoom] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { user } = useContext(AuthContext);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/myBooking?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyRoom(data);
      });
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
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/myBooking/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              setMyRoom((prevRooms) =>
                prevRooms.filter((room) => room._id !== id)
              );
              Swal.fire("Deleted!", "Your Booking Is Deleted.", "success");
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
    const myBookingId = selectedRoom.roomIdNumber;
    const review = {
      username: user.email,
      rating,
      comment,
      timestamp: new Date().toISOString(),
      roomId: selectedRoom._id,
      myBookingId,
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
        }
      });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please select a new date.",
      });
    }

    try {
      const response = await fetch(
        `http://localhost:3000/update-booking/${selectedRoom._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newDate: selectedDate }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMyRoom((prevRooms) =>
          prevRooms.map((room) =>
            room._id === selectedRoom._id
              ? { ...room, bookingDate: selectedDate }
              : room
          )
        );
        setUpdateModalOpen(false);
        Swal.fire("Updated!", "Booking date updated successfully!", "success");
      } else {
        Swal.fire({
          icon: "Success",
          title: "Date Is updated",
          //   text: data.message ||,
        });
      }
    } catch (error) {
      console.error("Error updating booking date:", error);
      Swal.fire({ icon: "error", title: "Error!", text: "An error occurred." });
    }
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
                        setIsModalOpen(true);
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
                        setUpdateModalOpen(true);
                        setSelectedDate(new Date(room.bookingDate));
                      }}
                    >
                      Update Date
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
          {/* ... (Review Modal Content - Same as before) */}
        </dialog>
      )}

      {updateModalOpen && selectedRoom && (
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
              <button className="btn" onClick={() => setUpdateModalOpen(false)}>
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
