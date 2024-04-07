import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
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
        window.localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        window.localStorage.setItem("static_value",1);
            
        {/*navigate('/edit');
      window.location.reload();*/}
      window.location.href='/edit';

    }
     else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className='bg'>
      <div className='wrapperl'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-boxl">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-boxl">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Login</button>
          <div className="register-linkl">
            <p>Don't have an account?  <Link to="/Register">Register</Link></p>
            <br /><p>or</p><br /><p>To Goto <Link to="/">Home</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginform;
