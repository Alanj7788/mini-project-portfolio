import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {

  const isLoggedIn = localStorage.getItem('userInfo');

  const handleLogout=()=>{
    localStorage.clear()
  };

  return (
    <div className='bg-fourth text-white'>

akash
<div className='flex flex-row px-10 gap-10'><Link to='/register' className='gap-20'>register</Link>
<Link to='/login' >login</Link>
<Link to='/admin' className='gap-5'>admin</Link></div>
<Link to='/portfolio' className='gap-5'>portfolio</Link>
<Link to='/search' className='gap-5'>search</Link>

{isLoggedIn ? (<Link to='/' className='gap-5' onClick={handleLogout}>Logout</Link>
): null}

    </div>
  )
}

export default Navbar