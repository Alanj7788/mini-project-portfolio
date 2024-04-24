import React from 'react'
import Intro from './Intro'
import About from './About'
import Experiences from './Experiences'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import LeftSider from './LeftSider'
import { useSelector } from 'react-redux'
import AcademicDetails from './AcademicDetails'
import Navbar from '../../components/Navbar'


function Home() {
  const {portfolioData}= useSelector(state=>state.root);

  return (
      <div>
      
      <Navbar />
      { portfolioData && (

      <div className="bg-primary px-40 sm:px-5">
      <Intro />
      <About />
      <AcademicDetails />
      <Experiences />
      <Projects />
      <Contact />
      
      <Footer />

      <LeftSider />
      </div>

      )}
      
    </div>
  )
}

export default Home
