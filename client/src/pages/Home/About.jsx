import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function About() {
  const {loading,portfolioData}= useSelector(state=>state.root);
  const {about}=portfolioData;
  const {lottieURL,description1,description2,skills}=about;
  
  return (
    
    <div>
      <SectionTitle title="About" />
        <div className="flex w-full items-center sm:flex-col">
            <div className="h-[70vh] w-1/2 sm:w-full">
            <lottie-player src="https://lottie.host/19168d10-5785-4ca6-b1a5-e438b51a74a2/mlauqMasuS.json" background="##fff" loop="4" speed="1"  autoplay direction="1" mode="normal"></lottie-player >
            </div>

          <div className="flex flex-col gap-5 w-1/2 sm:w-full">
            <p className=" text-white">
            {description1}
            </p>
            <p className=" text-white">
            {description2}
            </p>
          </div>

        </div>

        <div className="py-5">
          <h1 className="text-white text-xl">
            Here are a few technoligies i ve benn working with recently
          </h1>
          <div className="flex flex-wrap gap-10 mt-5">
          {skills.map((skill, index)=> (
            <div className="border border-tertiary py-3 px-9">
              <h1 className="text-white">{skill}</h1>
               </div>
          )
          )}
          </div>
        </div>
    </div>
  );
}

export default About
