import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Search() {
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    // Function to fetch all user IDs from the backend
    const fetchUserIds = async () => {
      try {
        // Make a GET request to fetch all user IDs
        const response = await axios.get('/api/get-all-user-ids');
        console.log(response)
        // Update the state with the fetched user IDs
        setUserIds(response.data);
      } catch (error) {
        console.error('Error fetching user IDs:', error);
      }
    };

    // Call the fetchUserIds function when the component mounts
    fetchUserIds();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <div>
      <h2>User IDs:</h2>
      <ul>
        {/* Map through the user IDs and render them as list items */}
        {userIds.map((userId, index) => (
          <li key={index}>{userId}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
{/*
import React from 'react';
import './Search.css'; // Import the CSS file

const Search = () => {
  return (
    <div className="card">
      <img className="card-img-top" src="holder.js/100px180?text=Image cap" alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">Card Title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
      </div>
      <div className="card-body">
        <a href="#" className="card-link">Card Link</a>
        <a href="#" className="card-link">Another Link</a>
      </div>
    </div>
  );
};

export default Search;


*/}