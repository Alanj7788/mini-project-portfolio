import React from 'react'
import SectionTitle from '../../components/SectionTitle'

import { useSelector } from 'react-redux';

function Experiences() {
  const {portfolioData}= useSelector(state=>state.root);
  const {experiences}=portfolioData;
  
    const [selectedItemIndex, setSelectedItemIndex]=React.useState(0);
    if (!experiences || experiences.length === 0) {
      return null; // Hide the component if experiences data is not available
    }

  return (
    <div>
      <SectionTitle  title="Experience"/>

      <div className="flex py-10 gap-10 sm:flex-col">

        <div className="flex flex-col gap-10 border-l-2 border-[#935e4c82] w-1/3  sm:flex-row sm:overflow-x-scroll sm:w-full">
        {experiences.map((experience,index)=>(
            <div onClick={()=>{
                setSelectedItemIndex(index);
            }}
            className='cursor-pointer'
            >
                <h1 className={`text-xl px-5
                ${selectedItemIndex === index ? "text-white border-tertiary border-l-4 -ml-1 bg-[#c0faf138] py-3 sm:w-full"
                 : "text-[#acaad0]"}`}>{experience.period}</h1>
                </div>
        ))}
        </div>

        <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl ">{experiences[selectedItemIndex].title}</h1>
            <h1 className="text-[#ade2c1] text-xl ">{experiences[selectedItemIndex].company}</h1>
            <p className="text-white">{experiences[selectedItemIndex].description}</p>
        </div>

      </div>
    </div>
  )
}

export default Experiences
