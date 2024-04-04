import { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import './Search.css'

export default function ViewUsers() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/ids/get-all-userid')
            .then((result) => {
                const filteredList = result.data; 
                setList(filteredList);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleUserIdClick = (userId) => {
      
        window.localStorage.setItem("userInfo", JSON.stringify(userId));
        window.location.href='/portfolio'; //update redux store and then display page

        {/*navigate('/portfolio');
    window.location.reload();*/}
        
    };

    return (
  <div className="view-users-container">
    <h2 className="view-users-title">User Details</h2>
    <div className="card-container">
      {list.map(user => (
        <div className="user-card" key={user.id}>
          <h3>{user.firstName+" "+user.lastName}</h3>
          <p>{user.sem+" "}</p>
          <p>{user.skills+" "}</p>
          
          <p>
           <button onClick={() => handleUserIdClick(user)}>
              {user.id}</button> 
            
            
          </p>
        </div>
      ))}
    </div>
  </div>
);

}
