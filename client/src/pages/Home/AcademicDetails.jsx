import React from 'react'
import SectionTitle from '../../components/SectionTitle'

import { useSelector } from 'react-redux';

function AcademicDetails() {
  const {portfolioData}= useSelector(state=>state.root);
  const {academics}=portfolioData;
  
    const [selectedItemIndex, setSelectedItemIndex]=React.useState(0);

    if (!academics || academics.length === 0) {
      return null; // Hide the component if academics data is not available
    }


  return (
    <div>
      <SectionTitle  title="Academic"/>

      <div className="flex py-10 gap-10 sm:flex-col">

        <div className="flex flex-col gap-10 border-l-2 border-[#935e4c82] w-1/3  sm:flex-row sm:overflow-x-scroll sm:w-full">
        {academics.map((academic,index)=>(
            <div onClick={()=>{
                setSelectedItemIndex(index);
            }}
            className='cursor-pointer'
            >
                <h1 className={`text-xl px-5
                ${selectedItemIndex === index ? "text-white border-tertiary border-l-4 -ml-1 bg-[#c0faf138] py-3 sm:w-full"
                 : "text-[#acaad0]"}`}>{academic.level}</h1>
                </div>
        ))}
        </div>

        <div className="flex flex-col gap-5">
            
            <h1 className="text-[#ade2c1] text-xl ">School Name::{academics[selectedItemIndex].name}</h1>
            <p className="text-white">Place::{academics[selectedItemIndex].place}</p>
            <h1 className="text-[#ade2c1] text-xl ">Grade Scored::{academics[selectedItemIndex].grade}</h1>
            <p className="text-white">Period of Study::{academics[selectedItemIndex].period}</p>
            
        </div>

      </div>
    </div>
  )
}

export default AcademicDetails
