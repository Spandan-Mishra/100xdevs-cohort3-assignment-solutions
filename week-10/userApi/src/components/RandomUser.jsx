import React, { useEffect, useState } from 'react'
import './RandomUser.css'
import { motion } from 'motion/react';
import axios from 'axios';

const RandomUser = () => {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [currUsers, setCurrUsers] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('https://randomuser.me/api/');
    const data = response.data.results[0];
    
    setUsers([...users, data]); 

    console.log(users);
    console.log(currUsers);
  }
  
  const switchPage = (i) => {
    setPage(i);
    {10*(i+1) >= users.length ? setCurrUsers(users.slice(i * 10, users.length))
     : setCurrUsers(users.slice(i * 10, i * 10 + 10))};
  }

  const pageButtons = [];
  for(let i = 0; i <= (users.length) / 10 ; i++) {
    pageButtons.push(<motion.div 
      className='cursor-pointer flex justify-center text-xl bg-black hover:bg-slate-800 text-white rounded-lg py-2 px-3' 
      whileHover={{
        scale: 1.1,
        boxShadow: '10px 8px 15px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'teal',
        color: 'black',
        transition: { duration: 0.2 }
      }}
      key={i} 
      onClick={() => switchPage(i)}>
        {i + 1}
      </motion.div>);
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    {10*(page+1) > users.length ? setCurrUsers(users.slice(page * 10, users.length))
     : setCurrUsers(users.slice(page * 10, page * 10 + 10))};
  }, [users]);

  return (
    <>
      {currUsers.length !== 0  ?
        <div className='flex flex-wrap justify-center gap-8 px-5 mt-32 mb-20'>
        {currUsers.map((user) => (
          <User user={user} key={user.login.uuid}/>
        ))}
      </div>
      : <h1 className='text-8xl text-center mt-32 mb-20'>Loading...</h1>}
      <div className='flex flex-col items-center gap-8'>
        <motion.div 
          className='cursor-pointer flex justify-center text-xl bg-black text-white rounded-lg py-2 w-48' 
          onClick={fetchData}
          whileHover={{
            scale: 1.1,
            boxShadow: '10px 8px 15px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'teal',
            color: 'black',
            transition: { duration: 0.2 }
          }}
          >
          Generate Users
        </motion.div>
        {users.length > 10 ? <div className='flex gap-2'>
          {pageButtons}
        </div>
        : null}
      </div>
    </>
  )
}

const User = ({ user }) => {
  return (
    <motion.div 
      className='flex flex-col justify-center items-center py-5 border rounded-lg gap-2 w-72 h-52 bg-teal-600 border-black border-2'
      whileHover={{
        y: -10,
        scale: 1.05,
        boxShadow: '10px 8px 15px rgba(0, 0, 0, 0.2)',
        transition: { duration: 0.2 }
      }}
      >
      <img src={user.picture.medium} className='rounded-full w-20 h-20' alt="user" />
      <h1 className='text-2xl'>{user.name.first} {user.name.last}</h1>
    </motion.div>
  )
}

export default RandomUser