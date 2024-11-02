//  implement the home page UI here.
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  return (
    //  write home page UI code here
    <>
      <div className='flex my-40 mx-28'>
        <div className='flex-1'>
          <p className='text-9xl albert-sans-400 ml-32 mt-10 px-'>Coursify.</p>
        </div>
        <div className='flex-1'>
          <p className='text-6xl roboto-condensed-400 mt-10 px-36'>
            Your one stop website to buy and sell courses
          </p>
        </div>
      </div>
      <div className='text-4xl flex justify-center pt-28 roboto-condensed-400'>
        <button className='bg-violet-900 hover:bg-violet-950 p-2 rounded-md' onClick={() => navigate("/users/courses")}>Click to view all available courses!</button>
      </div>
    </>
  )
}

export default Home