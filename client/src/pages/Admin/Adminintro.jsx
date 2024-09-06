import React, { useState } from 'react'
import {Form, message} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from 'axios';


function Adminintro() {


const apiUrl = process.env.REACT_APP_API_URL;  
  const dispatch = useDispatch();

  const {portfolioData} = useSelector((state)=> state.root);

  const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};

  const onFinish=async(values)=>{
    try{
      dispatch(ShowLoading())
      const response= await axios.post(`${apiUrl}/api/portfolio/update-intro/${user.id}`, { 
      ...values,_id: portfolioData.intro._id,});

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

  const [file,setFile]=useState()

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${apiUrl}/api/portfolio/upload/${user.id}` ,formData);
      console.log(formData);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };


  return (
    <div>
      <div className="flex justify-end">
        <input type="file" onChange={e=> setFile(e.target.files[0])} />
        <button className="bg-primary px-5 py-2 text-white" 
        onClick={handleUpload}
        >Upload </button>
      </div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.intro}>
        <Form.Item name='welcomeText' label='Welcome Text'>
          <input placeholder="Welcome Text"/>
        </Form.Item>
        <Form.Item name='firstName' label='First Name'>
          <input placeholder="First Name"/>
        </Form.Item>
        <Form.Item name='lastName' label='Last Name'>
          <input placeholder="Last Name"/>
        </Form.Item>
        <Form.Item name='caption' label='Caption'>
          <input placeholder="Caption"/>
        </Form.Item>
        <Form.Item name='description' label='Description'>
          <textarea placeholder="Description"/>
        </Form.Item>
        <div className="flex justify-end w-full">
          <button className="px-10 py-2  bg-primary text-white " type='submit'>SAVE</button>
        </div>

      </Form>
    </div>
  )
}

export default Adminintro
