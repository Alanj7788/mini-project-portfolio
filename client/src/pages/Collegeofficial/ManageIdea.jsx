import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/rootSlice';
import { message } from "antd";


export default function ManageIdea() {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loggedinuser, setLoggedinUser] = useState(JSON.parse(window.localStorage.getItem("userInfo")) || null);
    

    useEffect(() => {
        axios.get('/api/idea/get-all-useridea')
            .then((result) => {
                const filteredList = result.data; 
                setList(filteredList);
                setSearch(filteredList);
            })
            .catch((err) => console.log(err));
    }, []);

    const filter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setSearch(list.filter(idea => 
            (idea.firstName && idea.firstName.toLowerCase().includes(searchTerm)) 
        ));
    };

    const handleLogout = () => {
        // Clear the logged-in user information
        setLoggedinUser(null);
        // Clear localStorage
        window.localStorage.removeItem("userInfo");
    };

    const onDelete = async (idea) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/idea/delete-aidea", {
                _id: idea,
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


    return (
        <div className="min-h-screen bg-black ">
            <div className="container text-gray-200 py-3">
                {/* Header */}
                <div className="flex border-b border-gray-500 pb-2 justify-between items-center">
                    <h1 className="text-2xl px-2 first-letter:text-5xl">COMMUNITY SPACE</h1>
                    {loggedinuser && (
                        <button onClick={handleLogout}>Logout</button>
                    )}
                </div>

                {/* Search bar */}
                <div className="flex justify-center h-11 my-5 items-center">
                    <input
                        placeholder="Search"
                        onChange={filter} 
                        type="text"
                        className="h-full md:w-1/3 outline-none text-gray-800 px-2 font-semibold text-lg w-2/3"
                    />
                </div>
  
                {/* Ideas */}
                <div className="flex gap-5 flex-wrap justify-center py-5">
                    {search.length === 0 ? (
                        <div className="text-white">No items matched your search.</div>
                    ) : (
                        search.map(idea => (
                            <div className="flex w-[400px] border border-gray-500 bg-gray-900 p-3 flex-col" key={idea._id}>
                                <div className='cursor-pointer px-1'>
                               
                                    <p className="px-1 text-teal-400">{idea.firstName + " " + idea.lastName}</p>
                                </div>
                                <p className="ml-auto text-sm text-gray-500">{idea.date}</p>
                                <p>{idea.idea}</p>
                                <div>
                                    <p>Likes: {idea.likes.length}</p>
                                   <button onClick={() => {
                        onDelete(idea._id);
                    }}><MdDelete /></button> 
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
