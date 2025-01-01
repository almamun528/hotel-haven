import React from 'react';
import ErrorAnimation from '../assets/Error.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
const Error = () => {

    return (
        <>
            <section className='w-full max-h-min flex items-center justify-center'>
                <Lottie animationData={ErrorAnimation}/>
            </section>
            <section className='flex items-center justify-center text-center'>
                <Link className='btn btn-primary' to='/'> Back To Home </Link>
            </section>
        </>
    );
};

export default Error;