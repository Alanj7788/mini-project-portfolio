import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>

akash
<div className='flex flex-row px-10 gap-10'><Link to='/register' className='gap-20'>register</Link>
<Link to='/login' >login</Link>
<Link to='/admin' className='gap-5'>admin</Link></div>

      
    </div>
  )
}

export default Navbar