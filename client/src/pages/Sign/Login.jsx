import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/user/login', {
        email,
        password,
      });
      dispatch(HideLoading());

      if (response.data.success) {
        console.log(response.data.user);
        message.success(response.data.message);
        window.localStorage.setItem("userInfo", JSON.stringify(response.data.user))
        navigate('/admin');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className='image'>
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <RiLockPasswordFill className="icon" />
          </div>
          <div className="remember-forget">
            <label><input type="checkbox" />Remember me </label>
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
