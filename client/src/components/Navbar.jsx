import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/image.png';
import {FaBars, FaXmark} from 'react-icons/fa6'
import { motion } from "framer-motion"

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Changed Window.scrollY to window.scrollY
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Added event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Added empty dependency array to run the effect only once


  // Use state to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('static_value'));
  const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};

  console.log(user.isadmin);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    // Update isLoggedIn state
    setIsLoggedIn(false);
  };

  return (

    <header className='w-full bg-[#cbdaf2]   top-0 left-0 right-0'>
      <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-[#cbdaf2] duration-300" :""}`}>

        {/* */}
        {/*for large devices */}
        <div className="flex justify-between items-center text-base gap-8">

        <motion.div className="text-2xl font-semibold space-x-3"
  initial={{ x: -250 }} 
  animate={{ x: 0, transition: { duration: 6, loop: Infinity, ease: "linear" } }} >

            <img src={logo} alt="" className="w-12 inline-block items-center"/>


            <span className="text-[#263238]"
            >CAMPUS CONNECT PRO</span>
          
          
          </motion.div>





          <motion.div className='lg:flex space-x-12 sm:hidden'
          
          whileHover={{scale:.95,originX:0}}
          transition={{type:'spring', stiffness:100}}
          
          >

          {!isLoggedIn && (
        <>      
        <Link to='/login' className="block text-base text-gray900 hover:text-brandPrimary first:font-medium">login</Link>
        </>
          )}

        <Link to='/' className="block text-base text-gray900 hover:text-brandPrimary first:font-medium">Home</Link>
        <Link to='/search' className="block text-base text-gray900 hover:text-brandPrimary first:font-medium">Search</Link>
        {user.isadmin ? (<Link to='/managesearch' className="block text-base text-gray900 hover:text-brandPrimary first:font-medium">manage_search</Link>) : null }
        {user.isadmin ? (<Link to='/manageidea' className="block text-base text-gray900 hover:text-brandPrimary first:font-medium">manage_idea</Link>) : null }

        <Link to='/ideas' className="block text-base text-gray900 hover:text-brandPrimary first:font-medium">Ideas</Link>

        {isLoggedIn ? (
          <Link to='/' className="block text-base text-gray900 hover:text-brandPrimary first:font-medium" onClick={handleLogout}>
            Logout
          </Link>
        ) : null}

      
    </motion.div>



       {/* menu button for only mobile devices */}
<div className="hidden sm:block">
  <button
  onClick={toggleMenu}
  className="hover:text-[hsl(202,66%,57%)] focus:outline-none focus:text-navtext">
    {isMenuOpen ? (<FaXmark className="h-6 w-6 text-navtext" />) : (<FaBars
    className="h-6 w-6" />)}
  </button>
</div>
        </div>



{/*nav items for mobile */}

<motion.div className={`space-y-4 px-9 mt-16 py-8 ${isMenuOpen ? "block bg-navbg shadow-lg rounded-lg border border-white mobile-menu fixed top-0 right-5 z-50" : "hidden"}`}

whileHover={{scale:.95,originX:0}}
          transition={{type:'spring', stiffness:100}}

>
  {!isLoggedIn && (
    <>
      <Link to='/login' className="block text-base text-blue hover:text-white font-medium">Login</Link>

    </>

  )}
  
  <Link to='/' className="block text-base text-gray-900 hover:text-white  font-medium">Home</Link>
  <Link to='/search' className="block text-base text-gray-900 hover:text-white  font-medium">Search</Link>
  {user.isadmin && (
    <>
      <Link to='/managesearch' className="block text-base text-gray-900 hover:text-white  font-medium">Manage Search</Link>
      <Link to='/manageidea' className="block text-base text-gray-900 hover:text-white  font-medium">Manage Idea</Link>
    </>
  )}
  <Link to='/ideas' className="block text-base text-gray-900 hover:text-white  font-medium">Ideas</Link>
  {isLoggedIn ? (
    <Link to='/' className="block text-base text-gray-900 hover:text-white  font-medium" onClick={handleLogout}>Logout</Link>
  ) : null}
</motion.div>

        </nav>
    </header>
  );
};

export default Navbar;
