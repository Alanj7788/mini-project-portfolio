import React from 'react'
import {Form, message} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from 'axios';


function AdminSidebar() {
  
  const dispatch = useDispatch();

  const {portfolioData} = useSelector((state)=> state.root);
  const onFinish=async(values)=>{
    try{
      dispatch(ShowLoading())
      const response= await axios.post("/api/portfolio/update-left", { 
      ...values,_id: portfolioData.left._id,});

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
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.left}>
        <Form.Item name='fblink' label='Facebook Link'>
          <input placeholder="Facebook Link"/>
        </Form.Item>
        <Form.Item name='gitlink' label='Github Link'>
          <input placeholder="Github Link"/>
        </Form.Item>
        <Form.Item name='linkedinlink' label='Linkedin Link'>
          <input placeholder="Linkedin Link"/>
        </Form.Item>
        <Form.Item name='instalink' label='Instagram Link'>
          <input placeholder="Instagram Link"/>
        </Form.Item>
        <Form.Item name='maillink' label='G-Mail Link'>
          <input placeholder="G-Mail Link"/>
        </Form.Item>
       
        <div className="flex justify-end w-full">
          <button className="px-10 py-2  bg-primary text-white " type='submit'>SAVE</button>
        </div>

      </Form>
    </div>
  )
}

export default AdminSidebar
