import Lottie from 'lottie-react';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginAnimation from '../assets/login.json'
import AuthContext from '../Provider/AuthContext';
import Swal from 'sweetalert2';

const Login = () => {
const {userLogin} = useContext(AuthContext);
const navigate = useNavigate()
const location = useLocation()

// Login Form Trigger 
const handleLogin = (e)=>{
  e.preventDefault()
  const form = e.target; 
  const email = form.email.value 
  const password = form.password.value 


  userLogin(email, password)
    .then((result) => {
      navigate(location?.state ? location.state : "/");

      // tost massage
      setTimeout(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      }, 1000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
// tost message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "invalid login credential",
        // footer: "invalid login credential",
      });
      console.log("ERROR ", errorMessage, errorCode);
    });

}

    return (
      <>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <div className="w-8/12 mx-auto">
              
           <Lottie animationData={LoginAnimation} />
              </div>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={handleLogin}
               className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                    name='email'
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                    name='password'
                  />

                  <Link className='mt-3' to="/register">
                    {" "}
                    Are You New? Go to <b>Register</b>{" "}
                  </Link>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
};

export default Login;