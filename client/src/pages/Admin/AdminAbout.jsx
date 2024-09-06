import React from 'react'
const apiUrl = process.env.REACT_APP_API_URL;
import { Form, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from 'axios';


function AdminAbout() {

  const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};

  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {

      const tempSkills = values.skills.split(",");
      values.skills = tempSkills;


      dispatch(ShowLoading())
      const response = await axios.post(`${apiUrl}/api/portfolio/update-about/${user.id}`, {
        ...values, _id: portfolioData.about._id,
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
      <Form onFinish={onFinish} layout='vertical' initialValues={{ ...portfolioData.about, skills: portfolioData.about.skills.join(","), }}>
       {/* <Form.Item name='lottieURL' label='Lottie URL'>
          <input placeholder="Lottie URL" />
  </Form.Item>*/}

        <Form.Item name='description1' label='Description 1'>
          <textarea placeholder="Description 1" />
        </Form.Item>
        <Form.Item name='description2' label='Description 2'>
          <textarea placeholder="Description 2" />
        </Form.Item>
        <Form.Item name='skills' label='Skills'>
          <textarea placeholder="Skills" />
        </Form.Item>


        <div className="flex justify-end w-full">
          <button className="px-10 py-2  bg-primary text-white " type='submit'>SAVE</button>
        </div>

      </Form>
    </div>
  )
}

export default AdminAbout
