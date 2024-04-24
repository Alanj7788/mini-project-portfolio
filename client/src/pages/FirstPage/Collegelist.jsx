import React, { useState } from 'react';
import './Collegelist.css'; // Import your CSS file
import backgroundImage from '././assets/welcome.jpg'; 
import { Link } from 'react-router-dom'
import {Carousel} from 'flowbite-react';

const Home = () => {
  return (
    <div className='bg-neutralSilver'>
<div className='px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen '>

<Carousel className='w-full mx-auto'>
        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          
          
          <div>
            <img src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg" alt="" />

          </div>

        {/*hero txt */}
          <div className='md:w-1/2'>
            <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug'>Hi I creates a portfolio 
            <span className='text-brandPrimary leading-snug'> for everyone</span> </h1>
            <p className='text-neutralGrey text-base mb-8'>Where to develop your portfolios</p>
            <button className='btn-primary'>Register</button>
          </div>
        </div>

        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          
          
          <div>
            <img src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg" alt="" />

          </div>

        {/*hero txt */}
          <div className='md:w-1/2'>
            <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug'>Learn And 
            <span className='text-brandPrimary leading-snug'> Grow</span> </h1>
            <p className='text-neutralGrey text-base mb-8'>Where to develop your portfolios</p>
            <button className='btn-primary'>Register</button>
          </div>
        </div>

        <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          
          
          <div>
            <img src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Beautiful-Full-HD-Images.jpg" alt="" />

          </div>

        {/*hero txt */}
          <div className='md:w-1/2'>
            <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey md:w-3/4 leading-snug'>Make your own 
            <span className='text-brandPrimary leading-snug'> Portfolio</span> </h1>
            <p className='text-neutralGrey text-base mb-8'>Where to develop your portfolios</p>
            <button className='btn-primary'>Register</button>
          </div>
        </div>

        

      </Carousel>

</div>

    </div>
  )
}

export default Home