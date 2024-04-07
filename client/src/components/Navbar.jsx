import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {

  const isLoggedIn = localStorage.getItem('static_value');

  const handleLogout=()=>{
    localStorage.clear()
  };

  return (
    <div className='bg-fourth text-white'>

<div className='flex flex-row px-10 gap-10'>
<Link to='/login' >login</Link>
<Link to='/' >Home</Link>
<Link to='/search' >Search</Link>
<Link to='/manage' >manage_search</Link>
<Link to='/ideas' >Ideas</Link>
</div>

{isLoggedIn ? (<Link to='/' className='gap-5' onClick={handleLogout}>Logout</Link>
): null}

    </div>
  )
}

export default Navbar