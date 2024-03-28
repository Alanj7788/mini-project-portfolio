import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
        navigate('/portfolio');
        window.location.reload();
        
    };

    return (
        <div className="view-users-container">
            <h2 className="view-users-title">User Details</h2>
            <div className="table-responsive">
                <table className="table table-bordered table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            {/* Add other table headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>
                                    <Link to='/portfolio' onClick={() => handleUserIdClick(user)}>
                                        {user.id}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
