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
