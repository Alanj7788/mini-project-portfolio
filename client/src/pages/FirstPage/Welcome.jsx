import React from 'react'
import Navbar from '../../components/Navbar'
import ContactIssue from './ContactIssue'
import Collegelist from './Collegelist'
import Team from './Team'

const Welcome = () => {
  return (
    <div>
      <Navbar />
      <Collegelist/>
      <br /> <br />
      <Team/>
      <ContactIssue/>
    </div>
  )
}

export default Welcome