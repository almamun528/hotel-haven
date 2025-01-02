import React from 'react';
import member1 from "../assets/agent-3.jpg";
import member2 from "../assets/agent-4.jpg";
import member3 from "../assets/Artboard-2team.jpg";
const TeamMember = () => {
    return (
      <>
    <h1 className='text-center text-lg font-semibold underline'>Out Team Member is for You to get anything</h1>
      <section className='mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 my-10'>
        {/* First person */}
        <div className="card bg-base-100  w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Name : Jone Done</h2>
            <p>Manager: Main role is to maintain full Hotel and Always assist to tourist to be safe. </p>
          </div>
          <figure>
            <img src={member1} alt="Shoes" />
          </figure>
        </div>
        {/* Second Person */}
        <div className="card bg-base-100 w-96  shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Ronni Colman</h2>
            <p>Operator : Role is to maintain all Servant and check tourist's room does it clean or not. Always assist tourist to get best quality ful service.   </p>
          </div>
          <figure>
            <img src={member2} alt="Shoes" />
          </figure>
        </div>
        {/* Third Person */}
        <div className="card bg-base-100  w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Emile Gomez</h2>
            <p>Receptionist : Role is to confirm the room which is booked by customer / tourist. Always assist to you to get Decision, which is based for your deal. </p>
          </div>
          <figure>
            <img src={member3} alt="Shoes" />
          </figure>
        </div>
      </section>
      </>
    );
};

export default TeamMember;