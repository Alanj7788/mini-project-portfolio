import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Form, Modal, message} from "antd";
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';


function AdminAcademic() {
    const dispatch=useDispatch();
    const {portfolioData}= useSelector((state)=>state.root);
    const {academics} = portfolioData; 
    const [showAddEditModal, setShowAddEditModal ] = React.useState(false);
    const [selectedItemForEdit , setselectedItemForEdit]= React.useState(null);
    const [type ="add" , setType]= React.useState("add");
    


    const onFinish=async(values)=>{

      try{
        dispatch(ShowLoading())
        let response;
        if(selectedItemForEdit)
        {
          response = await axios.post("/api/portfolio/update-academic", { ...values, _id: selectedItemForEdit._id });

        }
        else {
          response=await axios.post("/api/portfolio/add-academic",
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
        const response= await axios.post("/api/portfolio/delete-academic",{
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
       {/*prevs button was like this  <button className="bg-primary px-5 py-2 text-white" 
        onClick={()=>{
          setselectedItemForEdit(null);
          setShowAddEditModal(true);
        }}
        >Add Academic Details</button> */}
        <button className="bg-primary px-5 py-2 text-white" 
        onClick={()=>{
          setselectedItemForEdit(null);
          setShowAddEditModal(true);
          setType("add")
        }}
        >Add Academic Details</button>


      </div>
      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {academics.map((academic)=>(
            <div className="shadow border border-gray-400 p-5 font-semibold flex flex-col">
                <h1 className="text-primary text-xl font-extrabold">{academic.level}</h1>
                <h1>Name : {academic.name}</h1>
                <h1>Place : {academic.place}</h1>
                <h1>Grade : {academic.grade}</h1>
                <h1>{academic.period}</h1>
                <div className="flex justify-end gap-5 mt-5">
                <button className="bg-red-500 text-white px-5 py-2 "
                
                onClick={()=>{
                  onDelete(academic);
                }}
                
                >Delete</button>
                <button className="bg-primary text-white px-5 py-2 "
                onClick={()=>{
                  setselectedItemForEdit(academic);
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
          <Form.Item name='level' label='Level of Study'>
            <input placeholder="Level" />
          </Form.Item>
          <Form.Item name='name' label='Name of School'>
            <input placeholder="Name" />
          </Form.Item>
          <Form.Item name='place' label='Place of School'>
            <input placeholder="Place" />
          </Form.Item>
          <Form.Item name='grade' label='Grade Scored'>
            <input placeholder="Grade" />
          </Form.Item>
          
          <Form.Item name='period' label='Period of Study'>
            <input placeholder="Period" />
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

export default AdminAcademic
