import React from 'react';
import './Team.css';
import AVTR1 from './assets/avatar1.jpg';
import AVTR2 from './assets/avatar2.jpg';
import AVTR3 from './assets/avatar3.jpg';
import AVTR4 from './assets/avatar4.jpg';

// Import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

const data = [
  {
    avatar: AVTR2,
    name: 'Akash Joju',
    review: '"Working with Alan has been a game-changer for my projects. He brings a perfect blend of creativity and technical expertise to the table."',
  },
  {
    avatar: AVTR4,
    name: 'Alan Jose',
    review: '"Alan is not just a coder; he is a problem solver. His dedication to delivering high-quality, efficient solutions in both front-end and back-end development is truly impressive."',
  },
  {
    avatar: AVTR1,
    name: 'Annrose Watson',
    review: '"I ve collaborated with Alan on various web projects, and I m always amazed by his ability to turn complex ideas into seamless, user-friendly applications. A true full-stack magician!"',
  },
  {
    avatar: AVTR3,
    name: 'Geethika',
    review: '"As a friend and content creator, I can vouch for his commitment to excellence. His proficiency in both front-end and back-end technologies makes him a go-to person for any tech challenge."',
  },
];

const Team = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className='items-center justify-between'>Developers</h1>
        <h2>Team</h2>
        <br />
      </div>

      <Swiper
        className="container testimonials_container"
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {data.map(({ avatar, name, review }, index) => (
          <SwiperSlide key={index} className="testimonial">
            <div className="client_avatar">
              <img src={avatar} alt={`Avatar of ${name}`} />
            </div>
            <h5 className="client_name">{name}</h5>
            <small className="client_review">{review}</small>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Team;
