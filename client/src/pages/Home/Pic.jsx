import React from 'react'
import { useSelector } from 'react-redux';
import './Pic.css'
const Pic = () => {

    const {loading,portfolioData}= useSelector(state=>state.root);
    const {intro}=portfolioData;
    
    if(!intro){
      return null;
    }
    const {image}=intro;


  return (
   


      <div><br />
      
      <img className="home_img" src={`images/${image}`} />

      
      

      </div>

    
  )
}

export default Pic