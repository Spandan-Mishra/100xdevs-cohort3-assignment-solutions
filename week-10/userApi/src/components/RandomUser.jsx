import React, { useEffect, useState } from 'react'
import './RandomUser.css'
import axios from 'axios';

const RandomUser = () => {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('https://randomuser.me/api/');
    const data = response.data.results[0];
    // console.log(users);
    setUsers([...users, data]);
  }
  
  const pageButtons = [];
  for(let i = 0; i <= page; i++) {
    pageButtons.push(<div className='cursor-pointer flex justify-center text-xl bg-black hover:bg-slate-800 text-white rounded-lg py-2 px-3' 
      key={i} 
      onClick={() => setPage(i)}>
        {i + 1}
      </div>);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div className='flex flex-wrap justify-center gap-8 px-5 mt-32 mb-20'>
        {users.map((user) => (
          <User user={user} key={user.login.uuid}/>
        ))}
      </div>
      <div className='flex flex-col items-center gap-8'>
        <div className='cursor-pointer flex justify-center text-xl bg-black hover:bg-slate-800 text-white rounded-lg py-2 w-48' onClick={fetchData}>
          Generate Users
        </div>
        {page ? <div className='flex gap-2'>
          {pageButtons}
        </div>
        : null}
      </div>
    </>
  )
}

const User = ({ user }) => {
  console.log(user);
  return (
    <div className='flex flex-col justify-center items-center py-5 border rounded-lg gap-2 w-72 h-52'>
      <img src={user.picture.medium} className='rounded-full w-20 h-20' alt="user" />
      <h1 className='text-2xl'>{user.name.first} {user.name.last}</h1>
    </div>
  )
}

export default RandomUser