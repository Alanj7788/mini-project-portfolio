import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {Form, Modal, message} from "antd";
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';



function AddIdea() {


const apiUrl = process.env.REACT_APP_API_URL;
    const dispatch=useDispatch();
    const {portfolioData}= useSelector((state)=>state.root);
    const {ideas} = portfolioData; 
    
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
          response = await axios.post(`${apiUrl}/api/idea/update-idea/${user.id}`, { ...values, _id: selectedItemForEdit._id });

        }
        else {
          response=await axios.post(`${apiUrl}/api/idea/add-idea/${user.id}`,
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
        const response= await axios.post(`${apiUrl}/api/idea/delete-idea`,{
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
        >Add Idea Details</button>


      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {ideas.map((idea)=>(
            <div className="shadow border border-gray-400 p-5 font-semibold flex flex-col">
                <h1 className="text-primary text-xl font-extrabold">{idea.ownerid}</h1>
                
                <h1>Idea : {idea.idea}</h1>
                
                <div className="flex justify-end gap-5 mt-5">
                <button className="bg-red-500 text-white px-5 py-2 "
                
                onClick={()=>{
                  onDelete(idea);
                }}
                
                >Delete</button>
                <button className="bg-primary text-white px-5 py-2 "
                onClick={()=>{
                  setselectedItemForEdit(idea);
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
      title= {selectedItemForEdit ? "Edit Academic" : "Add Academic"}
      footer={null}
      onCancel={()=>{setShowAddEditModal(false);
      setselectedItemForEdit(null);
      }}
      >
        <Form layout="vertical" onFinish={onFinish}
        initialValues={selectedItemForEdit}
        >
          
          
          <Form.Item name='idea' label='idea'>
            <input placeholder="Idea" />
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

export default AddIdea
