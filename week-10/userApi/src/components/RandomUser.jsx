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
    setUsers((prevData) => [...prevData, data]);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <div>
        {users.map((user) => (
          <User user={user} key={user.login.uuid}/>
        ))}
      </div>
      <div className='cursor-pointer' onClick={fetchData}>
        Generate Users
      </div>
    </>
  )
}

const User = ({ user }) => {
  console.log(user);
  return (
    <div className='flex flex-col justify-center items-center py-3 border'>
      <img src={user.picture.medium} className='rounded-full' alt="user" />
      <h1>{user.name.first} {user.name.last}</h1>
    </div>
  )
}

export default RandomUser