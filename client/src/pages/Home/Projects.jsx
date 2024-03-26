import React from 'react'
import SectionTitle from '../../components/SectionTitle'

import { useSelector } from 'react-redux';

function Projects() {

  const {portfolioData}= useSelector(state=>state.root);
  const {projects}=portfolioData;
    const [selectedItemIndex, setSelectedItemIndex]=React.useState(0);
  
    if (!projects || projects.length === 0) {
      return null; // Hide the component if projects data is not available
    }


  return (
    <div>
      <SectionTitle  title="Projects"/>

      <div className="flex py-10 gap-10 sm:flex-col">

<div className="flex flex-col gap-10 border-l-2 border-[#935e4c82] w-1/3  sm:flex-row sm:overflow-x-scroll sm:w-full">
{projects.map((projects,index)=>(
    <div onClick={()=>{
        setSelectedItemIndex(index);
    }}
    className='cursor-pointer'
    >
        <h1 className={`text-xl px-5
        ${selectedItemIndex === index ? "text-white border-tertiary border-l-4 -ml-1 bg-[#c0faf138] py-3 sm:w-full"
         : "text-[#acaad0]"}`}>{projects.title}</h1>
        </div>
))}
</div>

<div className="flex items-center justify-center gap-10 sm:flex-col">
    <img src={projects[selectedItemIndex].image} alt="" className="h-60 w-72" />
    <div className="flex flex-col gap-5 ">
    <h1 className="text-secondary text-xl ">{projects[selectedItemIndex].description}</h1>
    <a href={projects[selectedItemIndex].link} class="text-[#ade2c1] text-xl">Deployed Link</a>
    
    </div>
</div>
</div>

    </div>
  )
}

export default Projects
