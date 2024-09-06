import { useEffect, useState } from 'react';
import axios from 'axios';
import AVTR2 from '../FirstPage/assets/avatar2.jpg';
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/rootSlice';
import { message } from "antd";

export default function ManageSearch() {


const apiUrl = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [search, setSearch] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('/api/ids/get-all-userid')
            .then((result) => {
                const filteredList = result.data;
                setList(filteredList);
                setSearch(filteredList);
            })
            .catch((err) => console.log(err));
    }, []);
{/* 
    const handleUserIdClick = (userId) => {
        window.localStorage.setItem("userInfo", JSON.stringify(userId));
        window.location.href = '/portfolio'; //update redux store and then display page
    }; */}

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const filter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setSearch(list.filter(f =>
            (f.firstName && f.firstName.toLowerCase().includes(searchTerm)) ||
            (f.skills && f.skills.length > 0 && f.skills.some(skill => skill.toLowerCase().includes(searchTerm)))
        ));
    };

    const onDelete = async (user) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/portfolio/delete-user", {
                _id: user._id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                window.location.reload();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const users = search.map(user => {
        const maillink = user.email;
        const mail = `mailto:${maillink || ''}`;

        return (
            <div className="flex w-[200px] border border-gray-500 bg-gray-900 p-3 flex-col items-center" key={user.id}>
                <img src={`images/${user.image}`} className="w-24 mb-4 border-4 border-teal-400 rounded-full" />
                <h1 className="text-l text-teal-400">{user.firstName + " " + user.lastName}</h1> 
                <p className="text-xs text-white">sem::{user.sem + " "}</p>
                <a href={mail || ''}>
                    <i className="ri-mail-line"></i>
                </a> 
                {/* Skills */}
                <div>
                    <p className="text-xs text-white">
                        {showAll ? user.skills.join(", ") : user.skills.slice(0, 3).join(", ")}
                    </p>
                    {user.skills && user.skills.length > 3 && (
                        <>
                            {!showAll ? (
                                <button onClick={toggleShowAll} className="text-xs text-blue-500">
                                    View more
                                </button>
                            ) : (
                                <button onClick={toggleShowAll} className="text-xs text-blue-500">
                                    View less
                                </button>
                            )}
                        </>
                    )}
                </div>

            {/*  <button onClick={() => handleUserIdClick(user)}>
                    <span className="text-gray-200 font-semibold rounded block px-4 py-1 bg-teal-600 my-3 tracking-wide">
                        View Profile
                    </span>
                </button>  */}  
<br />
                <button className="bg-red-500 text-white px-5 py-2 "
                    onClick={() => {
                        onDelete(user);
                    }}
                >Delete</button>
            </div>
        );
    });

    return (
        <div className="min-h-screen bg-black ">
            <div className="container text-gray-200 py-3">
                {/*header*/}
                <div className="flex border-b border-gray-500 pb-2 justify-center items-center">
                    <img
                        src="https://cdn3.iconfinder.com/data/icons/inficons/512/github.png"
                        className="w-24 rounded-full"
                    />
                    <h1 className="text-2xl px-2 first-letter:text-5xl">JYOTHI ENGINEERING COLLEGE</h1>
                </div>
                {/* Search bar */}
                <div className="flex justify-center h-11  my-5 items-center">
                    <input
                        placeholder="Search"
                        onChange={filter}
                        type="text"
                        className="h-full md:w-1/3 outline-none text-gray-800 px-2 
                        font-semibold text-lg w-2/3"
                    />
                </div>
                {/* Users */}
                <div className="flex gap-5 flex-wrap justify-center  py-5">
                    {search.length === 0 ? (
                        <div className="text-white">No items matched your search.</div>
                    ) : (
                        users
                    )}
                </div>
            </div>
        </div>
    );
}
