import React from 'react'
import { useSelector } from 'react-redux';

function Footer() {
  const {portfolioData}= useSelector(state=>state.root);
  const {intro}=portfolioData;
  
  if(!intro){
    return null;
  }
  return (
    <div className="py-10">
      <div className="h-[1px] w-full bg-gray-700">

      </div>

      <div className="flex items-center justify-center flex-col mt-2 opacity-17">
        <h1 className="text-tertiary">
            Designed and Developed By
        </h1>
        <h className="text-white mt-1">
            <span className="">GROUP 6</span>
        </h>
      </div>
    </div>
  )
}

export default Footer
