import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './Register.css';
import { useDispatch} from 'react-redux';
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import {message} from 'antd'

function Register(){
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();


  const handleRegister = async (event) => {

    event.preventDefault();

  axios.post("/api/portfolio/initialsidebar",{ownerid:id,fblink:"Enter:",gitlink:"Enter:",instalink:"Enter:", linkedinlink:"Enter:",maillink:"Enter:"})
   
  axios.post("/api/portfolio/initialintro",{ownerid:id,welcomeText:"Enter:",firstName:"Enter:",lastName:"Enter:",description:"Enter:",caption:"Enter:"})

  axios.post("/api/portfolio/initialAbout",{ownerid:id,lottieURL:"Enter:",description1:"Enter:",description2:"Enter:",skills:"Enter:"})

  axios.post("/api/portfolio/initialcontact",{name:"Enter",email:"Enter",gender:"Enter",age:"Enter",mobile:"Enter",address:"Enter",ownerid:id})

    // Add validation logic
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      dispatch(ShowLoading())
      // Make a POST request to your backend for user registration
      const response = await axios.post('/api/user/register', {
        email,
        id,
        password,
      });
      dispatch(HideLoading())
      if(response.data.success){
        message.success(response.data.message);
      }
      else {
        message.error(response.data.message)
      }

  } catch(error){
    dispatch(HideLoading());
      message.error(error.message)
  }
}

  

  return (
    <div className="imager">
      <div className='wrapper'>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <label htmlFor="email">KTU_ID</label>
            <input
              type="text"
              id="id"
              placeholder="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <RiLockPasswordFill className="icon" />
          </div>
          <div className="input-box">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <RiLockPasswordFill className="icon" />
          </div>
          <br/>
          <button type="submit" >Register</button>

          <div className="register-link">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
