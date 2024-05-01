import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function ViewUsers() {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [likes, setLikes] = useState({});
    const [loggedinuser, setLoggedinUser] = useState(JSON.parse(window.localStorage.getItem("userInfo")) || null);
    const [likedUsers, setLikedUsers] = useState({}); // Track liked users for each idea

    useEffect(() => {
        axios.get('/api/idea/get-all-useridea')
            .then((result) => {
                const filteredList = result.data; 
                setList(filteredList);
                setSearch(filteredList);
                initializeLikes(filteredList);
            })
            .catch((err) => console.log(err));
    }, []);

    const initializeLikes = (list) => {
        const initialLikes = {};
        const initialLikedUsers = {};
        list.forEach(idea => {
            // Check if the user previously liked the idea
            const userLiked = idea.likes.includes(loggedinuser?.id);
            initialLikes[idea._id] = { thumbsUp: userLiked };
            initialLikedUsers[idea._id] = false; // Set initial state for showing liked users
        });
        setLikes(initialLikes);
        setLikedUsers(initialLikedUsers);
    };
    
    const handleLikeClick = (ideaId) => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [ideaId]: { thumbsUp: !prevLikes[ideaId].thumbsUp }
        }));
        saveLike(ideaId, loggedinuser?.id);
    };

    const saveLike = (ideaId, ownerId) => {
        axios.post(`/api/idea/save-like/${ideaId}`, {
            ownerid: ownerId
        })
        .then((response) => {
            console.log(response.data); // Handle success
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error saving like:', error); // Handle error
        });
    };
    
    const filter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setSearch(list.filter(idea => 
            (idea.firstName && idea.firstName.toLowerCase().includes(searchTerm)) 
        ));
    };

    

    const toggleLikedUsers = (ideaId) => {
        setLikedUsers(prevState => ({
            ...prevState,
            [ideaId]: !prevState[ideaId]
        }));
    };

    return (
        <div className="min-h-screen bg-black ">
            <div className="container text-gray-200 py-3">
                {/* Header */}
                <div className="flex border-b border-gray-500 pb-2 justify-between items-center">
                    <h1 className="text-2xl px-2 first-letter:text-5xl">COMMUNITY SPACE</h1>
                    
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

                                <div className='flex items-end gap-4 py-2'>
                                    <div onClick={loggedinuser ? () => handleLikeClick(idea._id) : null} style={{ cursor: 'pointer' }}>
                                        {loggedinuser && (likes[idea._id]?.thumbsUp ? <FaHeart /> : <FaRegHeart /> )}
                                    </div>
    
                                    <div onClick={() => toggleLikedUsers(idea._id)} style={{ cursor: 'pointer' }}>
                                        <p>Likes: {idea.likes.length}</p>
                                    </div>

                                    {likedUsers[idea._id] && (
                                        <div>
                                            <p>Liked Users:</p>
                                            <ul>
                                                {idea.likes.map((userId, index) => (
                                                    <li key={index}>{userId}</li>
                                                    
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
