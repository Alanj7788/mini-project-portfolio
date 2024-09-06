import React from 'react'
const apiUrl = process.env.REACT_APP_API_URL;
import { useSelector, useDispatch } from 'react-redux'
import {Form, Modal, message} from "antd";
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';


function AdminExperience() {
    const dispatch=useDispatch();
    const {portfolioData}= useSelector((state)=>state.root);
    const {experiences} = portfolioData; 
    const [showAddEditModal, setShowAddEditModal ] = React.useState(false);
    const [selectedItemForEdit , setselectedItemForEdit]= React.useState(null);
    const [type ="add" , setType]= React.useState("add");
    

    const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};

    const onFinish=async(values)=>{

      try{
        dispatch(ShowLoading())
        let response;
        if(selectedItemForEdit)
        {
          response = await axios.post(`${apiUrl}/api/portfolio/update-experience/${user.id}`, { ...values, _id: selectedItemForEdit._id });

        }
        else {
          response=await axios.post(`${apiUrl}/api/portfolio/add-experience/${user.id}`,
          values);
        }
        
  
          dispatch(HideLoading())
          if(response.data.success){
            message.success(response.data.message);
            setShowAddEditModal(false);
            
            setType("add");
            dispatch(HideLoading());
            dispatch(ReloadData(true));
          }
          else {
            message.error(response.data.message)
          }
  
      } catch(error){
        dispatch(HideLoading());
          message.error(error.message)
      }
    };
  
    const onDelete=async (item) => {
      try {
        dispatch(ShowLoading());
        const response= await axios.post(`${apiUrl}/api/portfolio/delete-experience`,{
          _id:item._id,
        });
        dispatch(HideLoading());
        if(response.data.success){
          message.success(response.data.message);
          dispatch(HideLoading());
          dispatch(ReloadData(true));
        }else {

          message.error(response.data.message);
        }
      }catch(error){
        dispatch(HideLoading());
        message.error(error.message);
      }
    };

  return (
    <div>
      <div className="flex justify-end">
        <button className="bg-primary px-5 py-2 text-white" 
        onClick={()=>{
          setselectedItemForEdit(null);
          setShowAddEditModal(true);
          setType("add")
        }}
        >Add Experience</button>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {experiences.map((experience)=>(
            <div className="shadow border border-gray-400 p-5 font-semibold flex flex-col">
                <h1 className="text-primary text-xl font-extrabold">{experience.period}</h1>
                <h1>Company : {experience.company}</h1>
                <h1>Role : {experience.title}</h1>
                <h1>{experience.description}</h1>
                <div className="flex justify-end gap-5 mt-5">
                <button className="bg-red-500 text-white px-5 py-2 "
                
                onClick={()=>{
                  onDelete(experience);
                }}
                
                >Delete</button>
                <button className="bg-primary text-white px-5 py-2 "
                onClick={()=>{
                  setselectedItemForEdit(experience);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
                >Edit</button>

                </div>

            </div>
        ))}
      </div>

     

      {
        (
          type==="add" ||
        selectedItemForEdit 
        ) &&  <Modal 
        key={type}
        visible={showAddEditModal}
      title= {selectedItemForEdit ? "Edit Experience" : "Add Experience"}
      footer={null}
      onCancel={()=>{setShowAddEditModal(false);
      setselectedItemForEdit(null);
      }}
      >
        <Form layout="vertical" onFinish={onFinish}
        initialValues={selectedItemForEdit}
        >
          <Form.Item name='period' label='Period'>
            <input placeholder="Period" />
          </Form.Item>
          <Form.Item name='company' label='Company'>
            <input placeholder="Company" />
          </Form.Item>
          <Form.Item name='title' label='Title'>
            <input placeholder="Title" />
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <input placeholder="Description" />
          </Form.Item>
          <div className="flex justify-end">
            <button className="border-primary text-primary px-5 py-2" onClick={()=>{
              setShowAddEditModal(false);
            }}>Cancel</button>
            <button className="bg-primary text-white px-5 py-2">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
      }
    </div>
  )
}

export default AdminExperience
