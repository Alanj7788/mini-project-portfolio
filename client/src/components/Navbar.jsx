import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
    <div className='bg-fourth text-white'>
      <div className='flex flex-row px-10 gap-10'>
        <Link to='/login'>login</Link>
        <Link to='/'>Home</Link>
        <Link to='/search'>Search</Link>
        {user.isadmin ? (<Link to='/manage'>manage_search</Link>) : null }
        
        <Link to='/ideas'>Ideas</Link>

        {isLoggedIn ? (
          <Link to='/' className='gap-5' onClick={handleLogout}>
            Logout
          </Link>
        ) : null}

      </div>
    </div>
  );
};

export default Navbar;
