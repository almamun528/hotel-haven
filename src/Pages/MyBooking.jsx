import React, { useEffect, useState } from "react";

const MyBooking = () => {
  const [myRoom, setMyRoom] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/myBooking")
      .then((res) => res.json())
      .then((data) => {
        setMyRoom(data);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <h2 className="text-2xl text-center my-10">
        You Booked {myRoom && myRoom.length} Rooms
      </h2>

      <section className="my-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
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
                    <td>Review</td>
                    <td className="text-red-500 text-xl font-bold cursor-pointer">
                      X
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default MyBooking;
