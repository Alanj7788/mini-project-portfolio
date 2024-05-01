import React from 'react';

import { Link } from 'react-router-dom'
import { Carousel } from 'flowbite-react';
import { motion } from "framer-motion"

const Home = () => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5, duration:1.5}}>

    <div className='bg-neutralSilver'>
<div className='px-2 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen '>

<Carousel className='w-full mx-auto bg-transparent'>
{/*1 */}
        <div className="lg:flex-row-reverse my-1 sm:my-2 py-6 flex flex-col  items-center justify-between gap-12">
                    
          <div>
          <lottie-player src="https://lottie.host/219c0a00-4ea9-4c4a-90d0-3664a93ff2d8/4rbrXvqTpx.json" background="##fff" loop="4" speed="1"  autoplay direction="1" mode="normal"></lottie-player >
          

          </div>

        {/*hero txt */}
          <div className='sm:w-1/2'>
            <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey sm:w-2/4 leading-snug'>Still not 
            <span className='text-brandPrimary leading-snug'> Registered ???</span> </h1>
            <p className='text-neutralGrey text-base mb-8'>Register now and Login to add your profile</p>
            <Link to="/Register"><button className='btn-primary px-7 py-2 bg-brandPrimary text-white rounded hover:bg-neutralDGrey transition-all 
  duration-200 hover:-translate-y-1'>Register</button></Link>
            
          </div>
        </div>
{/*2 */}
        <div className="lg:flex-row-reverse my-1 sm:my-2 py-6 flex flex-col  items-center justify-between gap-12">
                    
          <div>
          <lottie-player src="https://lottie.host/19168d10-5785-4ca6-b1a5-e438b51a74a2/mlauqMasuS.json" background="##fff" loop="4" speed="1"  autoplay direction="1" mode="normal"></lottie-player >

          </div>

        {/*hero txt */}
          <div className='sm:w-1/2'>
            <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey sm:w-3/4 leading-snug'>Find
            <span className='text-brandPrimary leading-snug'> Profiles</span> </h1>
            <p className='text-neutralGrey text-base mb-8'>Search Profiles on the basis of your choice</p>
            <Link to="/search">
            <button className='btn-primary px-7 py-2 bg-brandPrimary text-white rounded hover:bg-neutralDGrey transition-all 
  duration-200 hover:-translate-y-1'>Search</button>
  </Link>
          </div>
        </div>

{/*3 */}
        <div className="lg:flex-row-reverse my-1 sm:my-2 py-6 flex flex-col  items-center justify-between gap-12">
                    
          <div >
          <lottie-player src="https://lottie.host/3260ce2e-c8d0-45fd-89ee-85decc841587/QeYLOrH9Iw.json"background="##fff" loop="4" speed="1"  autoplay direction="1" mode="normal"></lottie-player >

          </div>

        {/*hero txt */}
          <div className='sm:w-1/2'>
            <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey sm:w-3/4 leading-snug'>Community
            <span className='text-brandPrimary leading-snug'> Space</span> </h1>
            
            <p className='text-neutralGrey text-base mb-8'>To share ideas among friends, Please Login</p>
            <Link to="/login">
            <button className='btn-primary px-7 py-2 bg-brandPrimary text-white rounded hover:bg-neutralDGrey transition-all 
  duration-200 hover:-translate-y-1'>Login</button>
  </Link>
<br /> <br /> <br />
            <p className='text-neutralGrey text-base mb-8'>To view ideas , Please click</p>

            <Link to="/ideas">
            <button className='btn-primary px-7 py-2 bg-brandPrimary text-white rounded hover:bg-neutralDGrey transition-all 
  duration-200 hover:-translate-y-1'>Ideas</button>
  </Link>
          </div>
        </div>

        

      </Carousel>

</div>

    </div>
    </motion.div>
  )
}

export default Home  