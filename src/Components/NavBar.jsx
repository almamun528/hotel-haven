import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Provider/AuthContext';

const NavBar = () => {
  const {user, logOut}= useContext(AuthContext)
//  console.log(user)
 const handleLogOut = () => {
   logOut()
     .then(() => {
       console.log("User LogOut Done");
     })
     .then((error) => {
       console.log(error?.message);
     });
 };
    const links = (
      <>
        <li className='font-semibold md:text-lg'>
          {" "}
          <Link to="/"> Home </Link>{" "}
        </li>
        <li className='font-semibold md:text-lg'>
          {" "}
          <Link to="/hotels"> Rooms </Link>{" "}
        </li>
        {/* <li>
          {" "}
          <Link to="/details"> Details </Link>{" "}
        </li> */}
      </>
    );
    // !Profile Links
    const profileLinks = (
      <>
        <li>
          {" "}
          <Link to="/myBooking">My Booking</Link>{" "}
        </li>

        <li onClick={handleLogOut}>
          <button>Logout</button>
        </li>
      </>
    );

    return (
      <>
        <div className="navbar bg-base-200 sticky top-0 z-10">
          <div className="navbar-start  ">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">
              Hotel-Haven
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            {user && user?.email ? (
              <>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    {/* User Profile Links is here  */}
                    {profileLinks}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <Link to="/login">
                    {" "}
                    <button className="btn btn-primary">Login</button>
                  </Link>
                  <Link to="/register">
                    <button className="btn btn-primary">Register</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
};

export default NavBar;