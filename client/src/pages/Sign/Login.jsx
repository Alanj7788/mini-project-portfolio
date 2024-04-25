import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
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
            
        window.location.href='/edit';
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <>
    
    <motion.div className="bg-gray-50 min-h-screen flex items-center justify-center"
    
    drag 
    initial={{x:'-100vw'}}
    animate={{x:0,rotate:360}}

    transition={{type:'spring', stiffness:120}}
    
    >
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h1 className="font-bold text-3xl text-[#002D74]">Login</h1>
          <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
              >
                
                
              </svg>
            </div>
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" type="submit">Login</button>
          </form>

          <br />

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <Link to="/Register">
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button></Link>
          </div>
          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Click to go to Home</p>
            <Link to="/">
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Home</button></Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="login background" />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Loginform;
