import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { GoReply } from "react-icons/go";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

export default function ViewUsers() {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [thumbsUpActive, setThumbsUpActive] = useState(true);
  const [thumbsDownActive, setThumbsDownActive] = useState(false);

  const handleThumbsUpClick = () => {
    setThumbsUpActive(!thumbsUpActive);
    if (thumbsDownActive) setThumbsDownActive(false);
  };

  const handleThumbsDownClick = () => {
    setThumbsDownActive(!thumbsDownActive);
    if (thumbsUpActive) setThumbsUpActive(false);
  };

    useEffect(() => {
        axios.get('/api/idea/get-all-useridea')
            .then((result) => {
                const filteredList = result.data; 
                setList(filteredList);
                setSearch(filteredList);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleUserIdClick = (userId) => {
        window.localStorage.setItem("userInfo", JSON.stringify(userId));
        window.location.href='/portfolio'; //update redux store and then display page
    };


    const filter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setSearch(list.filter(f => 
            (f.firstName && f.firstName.toLowerCase().includes(searchTerm)) 
            
        ));
    };

    return (
        <div className="min-h-screen bg-black ">
            <div className="container text-gray-200 py-3">

                {/*header*/}
                <div className="flex border-b border-gray-500 pb-2 justify-center items-center">
                    
                    <h1 className="text-2xl px-2 first-letter:text-5xl">COMMUNITY SPACE</h1>
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
                        search.map(user => (
                            <div className="flex w-[400px] border border-gray-500  
                            bg-gray-900 p-3 flex-col" key={user.id}>
                                
                                
    <div className='cursor-pointer px-1' onClick={() => handleUserIdClick(user)}>
        <p className="px-1 text-teal-400">{user.firstName + " " + user.lastName}  </p>
    </div>
    <p className="ml-auto text-sm text-gray-500">{user.date}</p>
    
    <p>{user.idea}</p>

<div className='flex items-end gap-4 py-2'>
     

      <div onClick={handleThumbsUpClick} style={{ cursor: 'pointer' }}>
        {thumbsUpActive ? <FaThumbsUp /> : <FaRegThumbsUp />}
      </div>

      <div onClick={handleThumbsDownClick} style={{ cursor: 'pointer' }}>
        {thumbsDownActive ? <FaThumbsDown /> : <FaRegThumbsDown />}
      </div>
    
    
    
   {/* <div><GoReply /></div>  */}
      </div>
    
                                
                        
                                <h3></h3>
                                
                                    
                                       
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

