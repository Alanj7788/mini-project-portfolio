import React, { useState } from 'react';
import './Collegelist.css'; // Import your CSS file
import backgroundImage from '././assets/welcome.jpg'; 
import { Link } from 'react-router-dom'

const Collegelist = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleList = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="back" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className={`tile-box ${isActive ? 'active' : ''}`} onClick={toggleList}>
        <div className="content sm:mx-10">
          {/* Content inside the tile box */}
          <span>Click to view College List</span> 
        </div>
        
        <div className="flex flex-wrap gap-8 mt-2">
          <div>
            <ul className={`list mb-5 ${isActive ? 'active' : ''}`}>
              <Link to='/search' className='gap-5'><li>Jyothi Engineering College</li></Link>
            </ul>
            <ul className={`list mb-5 ${isActive ? 'active' : ''}`}>
              <li>Vidya Engineering College</li>
            </ul>
            <ul className={`list mb-5 ${isActive ? 'active' : ''}`}>
              <li>Govt Engineering College</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collegelist;
