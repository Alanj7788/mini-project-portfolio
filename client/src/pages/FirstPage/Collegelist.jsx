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
            <img src="https://th.bing.com/th/id/OIP.D4xwYs6UMFwamX8plTAnowHaE7?w=1688&h=1125&rs=1&pid=ImgDetMain" alt="" />

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
            <img src="https://www.cropiqtech.com/sites/default/files/corporate.jpg" alt="" />

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
                    
          <div>
            <img src="https://www.immigration.ca/wp-content/uploads/2019/02/Intra-Company-Transferees_82110291.jpeg" alt="" />

          </div>

        {/*hero txt */}
          <div className='sm:w-1/2'>
            <h1 className='text-5xl font-semibold mb-4 text-neutralDGrey sm:w-3/4 leading-snug'>Community
            <span className='text-brandPrimary leading-snug'> Space</span> </h1>
            <p className='text-neutralGrey text-base mb-8'>To share ideas, Please Login</p>
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