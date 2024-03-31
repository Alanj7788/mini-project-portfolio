import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Search.css'

export default function ViewUsers() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/ids/get-all-userid')
            .then((result) => {
                const filteredList = result.data; // Assuming the response has a 'users' property containing the list of users
                setList(filteredList);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleUserIdClick = (userId) => {
      
        window.localStorage.setItem("userInfo", JSON.stringify(userId));
        window.location.reload();
        navigate('/portfolio');
        window.location.reload();
        
    };

    return (
  <div className="view-users-container">
    <h2 className="view-users-title">User Details</h2>
    <div className="card-container">
      {list.map(user => (
        <div className="user-card" key={user.id}>
          <h3>{user.firstName+" "+user.lastName}</h3>
          <p>
            <Link to='/portfolio' onClick={() => handleUserIdClick(user)}>
              {user.id}
            </Link>
          </p>
        </div>
      ))}
    </div>
  </div>
);

}
