import React from 'react'
const apiUrl = process.env.REACT_APP_API_URL;
import { Form, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from 'axios';


function AdminContact() {
  
  const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};


  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {

      dispatch(ShowLoading())
      const response = await axios.post(`${apiUrl}/api/portfolio/update-contact/${user.id}`, {
        ...values, _id: portfolioData.contact._id,
      });

      dispatch(HideLoading())
      if (response.data.success) {
        message.success(response.data.message);
      }
      else {
        message.error(response.data.message)
      }

    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message)
    }
  }

  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.contact}>
        <Form.Item name='name' label='Name'>
          <input placeholder="Name" />
        </Form.Item>

        <Form.Item name='gender' label='Gender'>
          <textarea placeholder="Gender" />
        </Form.Item>
        <Form.Item name='age' label='Age'>
          <textarea placeholder="Age" />
        </Form.Item>
        <Form.Item name='email' label='G-mail'>
          <textarea placeholder="G-mail" />
        </Form.Item>
        <Form.Item name='mobile' label='Mobile'>
          <textarea placeholder="Mobile" />
        </Form.Item>
        <Form.Item name='address' label='Address'>
          <textarea placeholder="Address" />
        </Form.Item>


        <div className="flex justify-end w-full">
          <button className="px-10 py-2  bg-primary text-white " type='submit'>SAVE</button>
        </div>

      </Form>
    </div>
  )
}

export default AdminContact
