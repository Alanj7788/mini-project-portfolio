import React from 'react';
import './Login.css';
import{Link} from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";


const Loginform = () => {
  return (
    <div className='image'>
    <div className='wrapper'>
       <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required/>
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required/>
          <RiLockPasswordFill className="icon" />
        </div>
        
        <div className="remember-forget">
          <label><input type="checkbox"/>Remember me </label>
          <a href='#'>Forget password?</a>
        </div>
        <button type="submit">Login</button>

        <div className="register-link">
          <p>Don't have an account?<Link to="/Register">Register</Link></p>
        </div>
        </form>
    </div>
    </div>
   );
};

export default Loginform;