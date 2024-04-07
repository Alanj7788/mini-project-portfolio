import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './Register.css';
import { useDispatch} from 'react-redux';
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import {message} from 'antd'

function Register(){
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [sem, setSem] = useState('');


  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();


  const handleRegister = async (event) => {

    event.preventDefault();

  axios.post("/api/portfolio/initialsidebar",{ownerid:id,fblink:"Enter:",gitlink:"Enter:",instalink:"Enter:", linkedinlink:"Enter:",maillink:"Enter:"})
   
  axios.post("/api/portfolio/initialintro",{ownerid:id,welcomeText:"Enter:",firstName,lastName,description:"Enter:",caption:"Enter:"})

  axios.post("/api/portfolio/initialAbout",{ownerid:id,lottieURL:"Enter:",description1:"Enter:",description2:"Enter:",skills:"Enter:"})

  axios.post("/api/portfolio/initialcontact",{name:"Enter",email,gender:"Enter",age:"Enter",mobile,address:"Enter",ownerid:id})

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
        firstName,
        lastName,
        mobile,
        sem,
        skills:"enter",
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
          </div>
          <div className="input-box">
            <label htmlFor="email">KTU_ID</label>
            <input
              type="text"
              id="id"
              placeholder="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
        maxLength={10} // Limit input to 10 characters
        pattern="JEC\d{2}[A-Z]{2}\d{3}" 
              required
            />{/* "[A-Z]{3}\d{2}[A-Z]{2}\d{3}" */}
          </div>
          <div className="input-box">
            <label htmlFor="email">First Name</label>
            <input
              type="text"
              id="name"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label htmlFor="email">Last Name</label>
            <input
              type="text"
              id="name"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="email">Current Semester</label>
            <input
              type="text"
              id="sem"
              placeholder="Semester"
              value={sem}
              onChange={(e) => setSem(e.target.value)}
              required
            />
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
          </div>
          
          <div className="input-box">
            <label htmlFor="email">Mobile no:</label>
            <input
              type="text"
              id="name"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <br/>
          <button type="submit" >Register</button>

          <div className="register-link">
            <p>Already have an account / Add more details? <Link to="/login">Login</Link></p>
           

          </div>
        </form>
      </div>
  );
};

export default Register;
