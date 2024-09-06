import React from 'react'
const apiUrl = process.env.REACT_APP_API_URL;
import { useSelector, useDispatch } from 'react-redux'
import {Form, Modal, message} from "antd";
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';


function AdminProjects() {
    const dispatch=useDispatch();
    const {portfolioData}= useSelector((state)=>state.root);
    const {projects} = portfolioData; 
    const [showAddEditModal, setShowAddEditModal ] = React.useState(false);
    const [selectedItemForEdit , setselectedItemForEdit]= React.useState(null);
    const [type ="add" , setType]= React.useState("add");
    
    const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};

console.log(user.id)
    const onFinish=async(values)=>{

      try{
        const tempTechnologies=values?.technolgies?.split(",") || [];
        values.technolgies=tempTechnologies;
        dispatch(ShowLoading())
        let response;
        if(selectedItemForEdit)
        {
          response = await axios.post("/api/portfolio/update-project/"+user.id, { ...values, _id: selectedItemForEdit._id });

        }
        else {
          response=await axios.post("/api/portfolio/add-project/"+user.id,
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
        const response= await axios.post("/api/portfolio/delete-project",{
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
        >Add Project</button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1">
        {projects.map((project)=>(
            <div className="gap-5 shadow border border-gray-400 p-5 font-semibold flex flex-col">
                <h1 className="text-primary text-xl font-extrabold">{project.title}</h1>
                <img src={project.image} alt="" className='h-60 w-80'/>
                
                <h1>{project.description}</h1>
                <h1>{project.link}</h1>
                <div className="flex justify-end gap-5 mt-5">
                <button className="bg-red-500 text-white px-5 py-2 "
                
                onClick={()=>{
                  onDelete(project);
                }}
                
                >Delete</button>
                <button className="bg-primary text-white px-5 py-2 "
                onClick={()=>{
                  setselectedItemForEdit(project);
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
      title= {selectedItemForEdit ? "Edit Project" : "Add Project"}
      footer={null}
      onCancel={()=>{setShowAddEditModal(false);
      setselectedItemForEdit(null);
      }}
      >
        <Form 
        layout="vertical" onFinish={onFinish}
        initialValues={{
        ...selectedItemForEdit,
        technolgies : selectedItemForEdit?.technolgies?.join(","),} || {} }
        >
          <Form.Item name='title' label='Title'>
            <input placeholder="Title" />
          </Form.Item>
          <Form.Item name='image' label='Image URL'>
            <input placeholder="Image" />
          </Form.Item>
          
          <Form.Item name='description' label='Description'>
            <textarea placeholder="Description" />
          </Form.Item>

          <Form.Item name='technolgies' label='Technolgies'>
            <input placeholder="Technolgies" />
          </Form.Item>

          <Form.Item name='link' label='Project Deployed Link'>
            <input placeholder="Deployed Link" />
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

export default AdminProjects
