import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion"

export default function ViewUsers() {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSem, setSelectedSem] = useState('All'); // Add selected semester state

    useEffect(() => {
        axios.get('/api/ids/get-all-userid')
            .then((result) => {
                const filteredList = result.data; 
                setList(filteredList);
                setSearch(filteredList);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        filter(); // Call the filter function whenever selectedSem changes
    }, [selectedSem]);

    useEffect(() => {
        filter(); // Call the filter function whenever searchTerm changes
    }, [searchTerm]);

    const handleUserIdClick = (userId) => {
        window.localStorage.setItem("userInfo", JSON.stringify(userId));
        window.location.href='/portfolio'; //update redux store and then display page
    };

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const filter = () => {
        const filteredData = list.filter(user => 
            (user.firstName && user.firstName.toLowerCase().includes(searchTerm)) || 
            (user.skills && user.skills.some(skill => skill.toLowerCase().includes(searchTerm))) 
        );
    
        const filteredBySemester = selectedSem === 'All Semester' ? filteredData : filteredData.filter(user => user.sem === selectedSem);
    
        setSearch(filteredBySemester);
    };
    
    const semesterOptions = ['All Semester', '1', '2', '3', '4','5', '6','7','8']; // Define semester options

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

                {/* Search bar and semester dropdown */}
                <div className="flex justify-center h-11  my-5 items-center">
                    <input
                        placeholder="Search"
                        onChange={(e) => {
                            setSearchTerm(e.target.value.toLowerCase());
                        }} 
                        type="text"
                        className="h-full md:w-1/3 outline-none text-gray-800 px-2 font-semibold text-lg w-2/3"
                    />
                    {/* Dropdown for selecting semester */}
                    <select
                        value={selectedSem}
                        onChange={(e) => setSelectedSem(e.target.value)}
                        className="ml-3 px-2 py-1 bg-gray-800 text-white"
                    >
                        {semesterOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Users */}
                <div className="flex gap-5 flex-wrap justify-center py-5">
                    {search.length === 0 ? (
                        <div className="text-white">No items matched your search.</div>
                    ) : (
                        search.map(user => (
                            <motion.div 
                                whileHover={{scale:1.11,originX:0}}
                                transition={{type:'spring', stiffness:100}}
                                key={user.id}
                            >
                                {user.isadmin === false && (
                                    <div className="flex w-[200px] border border-gray-500 bg-gray-900 p-3 flex-col items-center">
                                        <img src={`images/${user.image}`} className="w-24 mb-4 border-4 border-teal-400 rounded-full" />
                                        <h1 className="text-l text-teal-400">{user.firstName + " " + user.lastName}</h1>
                                        <p className="text-xs text-white">SEMESTER : {user.sem + " "}</p>
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
                                        <button onClick={() => handleUserIdClick(user)}>
                                            <span className="text-gray-200 font-semibold rounded block px-4 py-1 bg-teal-600 my-3 tracking-wide">
                                                View Profile
                                            </span>
                                        </button> 
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
