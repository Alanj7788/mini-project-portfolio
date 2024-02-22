import React from 'react'
import { useSelector } from 'react-redux';

function LeftSider() {

  const {portfolioData}= useSelector(state=>state.root);
  const {left}=portfolioData;
const {fblink,instalink,gitlink,linkedinlink,maillink}=left; 
const mail = `mailto:${maillink || ''}`;

  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
        <div className="flex flex-col items-center ">
      <div className="flex gap-3 flex-col text-gray-500 sm:flex-row mb-2 sm:gap-10">
      
        <a href={fblink || ''} >
            <i class="ri-facebook-box-fill"></i>
        </a>
      
        <a href={gitlink || ''}>
          <i class="ri-github-fill"></i>
      </a>
      
      <a href={linkedinlink || ''}>
           <i class="ri-linkedin-fill"></i>
      </a>

      <a href={instalink || ''}>
           <i class="ri-instagram-line"></i>
      </a>
      
      <a href={mail || ''}>
    <i className="ri-mail-line"></i>
</a>




    
      </div>
      <div className="w-[1px] h-52 bg-[#245668] sm:hidden">
      </div>
      </div>
    </div>
  );
}

export default LeftSider
