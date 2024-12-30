import React from 'react';
import registerAnimation from '../assets/register.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

const Register = () => {

  // Form Trigger Function
  const handleRegister = (e)=>{
    e.preventDefault()
    const form = e.target 
    const name = form.name.value
    const email = form.email.value 
    const photo = form.photo.value 
    const password = form.password.value 
    console.log(name, email, photo, password)
  }
    return (
      <>
        <main className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <div className="w-8/12 mx-auto">
                <Lottie animationData={registerAnimation} />
              </div>
            </div>
            {/* Form Controller section Start  */}
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form 
              onSubmit={handleRegister} className="card-body">
                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type Your Name"
                    className="input input-bordered"
                    required
                    name="name"
                  />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                    name="email"
                  />
                </div>
                {/* Photo URl */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Enter Photo URL"
                    className="input input-bordered"
                    required
                    name="photo"
                  />
                </div>
                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                    name="password"
                  />
                  <Link className="mt-3" to="/login"> Register? Go to <b>Login</b></Link>
                </div>
              
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Register Now</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </>
    );
};

export default Register;