import { useEffect, useState } from "react";
import Carousel from "../Components/Carousel";
import TeamMember from "../Components/TeamMember";
import Hotels from "./Hotels";
import Map from "../Components/Map";

const Home = () => {
    const [reviews, setReviews] = useState();
    const [rooms, setRooms]=useState([])
     useEffect(() => {
        fetch("http://localhost:3000/user-reviews")
          .then((res) => res.json())
          .then((data) => {
            setReviews(data);
          });
      }, []);
  
    
  return (
    <>
      {/* Slider */}
      <Carousel />
      {/* Room Sections */}
      <section className="my-5">
        <h2 className="text-xl font-semibold text-center my-4 underline">
          Rooms We Are Providing $200 In This week!
        </h2>
        <Hotels/>
      </section>
      {/* Map starts */}
            <Map/>
       {/* Map Ends  */}
      {/* User review Section */}
      <h2 className="text-center font-semibold my-10 text-lg md:text-2xl underline">
        Our Users Feedback
      </h2>
      <p className="my-2 text-center  ">
        You also can give feedback by booking the room and you might find the
        review option into my booking page
      </p>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10 mb-14 bg-base-300 shadow-2xl p-3 rounded-sm">
        {reviews &&
          reviews?.map((review, index) => (
            <main key={index}>
              <p className="text-lg font-semibold">
                User Email: {review?.username}{" "}
              </p>
              <p className="text-lg font-semibold">
                Ratting : {review?.rating} out of 5{" "}
              </p>
              <p className="text-lg font-semibold">
                Time : {review?.timestamp}{" "}
              </p>
              <p className="text-lg font-semibold">
                Comment : {review?.comment}{" "}
              </p>
            </main>
          ))}
      </section>
      {/* Team Member section  */}
      <TeamMember />
    </>
  );
};

export default Home;
