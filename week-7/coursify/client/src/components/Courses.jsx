// courses code here
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// use axios here, similar to register and login
const Courses = () => {

  const navigate = useNavigate();
  const { role } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <h1 className='inter-400 text-7xl text-center mt-14'>Browse all courses here!</h1>
      {role === "admin" ? (
        <div className='flex flex-col justify-center items-center'>
          <button onClick={() => setIsVisible((prevState) => !prevState)} className='roboto-condensed-400 text-2xl bg-violet-900 hover:bg-violet-950 py-2 w-36 my-12 rounded-md'>Add Course</button>
          {isVisible ? (
            <Modal />
          ): null}
        </div>
      ) : null}
    </>
  )
}

const Modal = () => {
  return (
            <div className='flex justify-center'>
            <h1 className='roboto-condensed-400 text-7xl text-center mt-40 mb-8'>Signup</h1>

            <form onSubmit={handleSignup} className='flex flex-col w-1/3 px-20 py-12'> 
                <div className='flex flex-col mb-8'>
                    <label className='inter-italic-400'>Username</label>
                    <input 
                        type='text'
                        name='title'
                        className='input-long'
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='inter-italic-400'>Password</label>
                    <input 
                        type='text'
                        name='description'
                        className='input-long'
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex'>
                  <div className='flex flex-col'>
                    <label className='inter-italic-400'>Password</label>
                    <input 
                        type='text'
                        name='price'
                        className='input-long'
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='inter-italic-400'>Password</label>
                    <input 
                        type='text'
                        name='imageLink'
                        className='input-long'
                        value={formData.imageLink}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className='flex justify-center mt-8'>
                    <button className='roboto-condensed-400 text-3xl bg-violet-900 hover:bg-violet-950 py-2 w-24 rounded-md'>Submit</button>
                </div>
            </form>
        </div>
  )
}

export default Courses