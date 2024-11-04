// courses code here
import axios from 'axios';
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
      <div className='h-0.5 bg-zinc-700'></div>
    </>
  )
}

const Modal = () => {
  const [formData, setFormData] = useState({ title: "", description: "", price: null, imageLink: "" })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposnse = await axios.post('/admin/courses', formData);
      console.log(resposnse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
          <form onSubmit={handleSubmit} className='flex flex-col pl-20 py-12'> 
              <div className='flex flex-col mb-8'>
                  <label className='inter-italic-400'>Title</label>
                  <input 
                      type='text'
                      name='title'
                      className='input-long'
                      value={formData.title}
                      onChange={handleChange}
                  />
              </div>
              <div className='flex flex-col mb-8'>
                  <label className='inter-italic-400'>Description</label>
                  <input 
                      type='text'
                      name='description'
                      className='input-big'
                      value={formData.description}
                      onChange={handleChange}
                  />
              </div>
              <div className='flex mb-8'>
                <div className='flex flex-col'>
                  <label className='inter-italic-400'>Price</label>
                  <input 
                      type='text'
                      name='price'
                      className='input-short'
                      value={formData.price}
                      onChange={handleChange}
                  />
                </div>
                <div className='flex flex-col'>
                    <label className='inter-italic-400'>Image Link</label>
                    <input 
                        type='text'
                        name='imageLink'
                        className='input-short'
                        value={formData.imageLink}
                        onChange={handleChange}
                    />
                </div>
              </div>
              <div className='flex pl-48'>
                  <button className='roboto-condensed-400 text-3xl bg-violet-900 hover:bg-violet-950 py-2 w-24 rounded-md'>Submit</button>
              </div>
          </form>
  )
}

export default Courses