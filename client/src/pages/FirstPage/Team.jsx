import React from 'react';
import './Team.css';
import AVTR1 from './assets/avatar1.jpg';
import AVTR2 from './assets/avatar2.jpg';
import AVTR3 from './assets/avatar3.jpg';
import AVTR4 from './assets/avatar4.jpg';
import { CiLinkedin } from "react-icons/ci";

import { FaGithub } from "react-icons/fa";

import { CiMail } from "react-icons/ci";

const data = [
  {
    id: 1,
    image: AVTR2,
    title: "AKASH JOJU",
    github: "https://github.com",
    linkedin: "iuhfvnigjnfsiurtjnfvdjk",
    mail:"vjnlvkm",
  },
  {
     id: 2,
    image: AVTR1,
    title: "ANNROSE WATSON",
    github: "https://github.com",
    linkedin: "iuhfvnigjnfsiurtjnfvdjk",
    mail:"vjnlvkm",
  },
  {
     id: 3,
    image: AVTR3,
    title: "GEETHIKA S",
    github: "https://github.com",
    linkedin: "iuhfvnigjnfsiurtjnfvdjk",
    mail:"vjnlvkm",
  },
  {
     id: 4,
    image: AVTR4,
    title: "ALAN JOSE",
    github: "https://github.com",
    linkedin: "iuhfvnigjnfsiurtjnfvdjk",
    mail:"vjnlvkm",
  },
  
]


const Team = () => {
  return (
    <section id='portfolio'>
      <div class="team-heading-container">
        <br /> <br />
    <h5 >Developers</h5>
    <h2>Team</h2>
    <br /> <br />
</div>

      <div className="container portfolio_container">
       {
        data.map(({id,image,title,github,linkedin,mail}) => {
          return (
            <article className='portfolio_item'>
          <div className="portfolio_item-image">
            <img src={image}  alt={title} />
          </div>
          <h3 className='team-heading-container'>{title}</h3>
          <br />
          <div className="portfolio_item-cta ">
          <a href={github} className='btn ' target='_blank'><FaGithub /></a>
          <a href={linkedin} className='btn btn-primary' target='_blank'><CiLinkedin /></a>
          <a href={mail} className='btn btn-primary' target='_blank'><CiMail /></a>

          </div>        
        </article>
          )
        })
      }
      </div> 
        <br /> <br /> <br /> <br />
        
             
        
             
       

       
        
    </section>
  )
}

export default Team;