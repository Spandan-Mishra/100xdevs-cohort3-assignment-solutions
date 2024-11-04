// courses code here
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const defaultImage = "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"

// use axios here, similar to register and login
const Courses = () => {

  const { role } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${role}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  })

  return (
    <>
      <h1 className='inter-400 text-7xl text-center mt-14'>Browse all courses here!</h1>
      {role === "admin" ? (
        <div className='flex flex-col justify-center items-center'>
          <button onClick={() => setIsVisible((prevState) => !prevState)} className='roboto-condensed-400 text-2xl bg-violet-900 hover:bg-violet-950 py-2 w-36 mt-12 rounded-md'>Add Course</button>
          {isVisible ? (
            <Modal />
          ): null}
        </div>
      ) : null}
      <div className='h-px bg-zinc-800 mt-20'></div>
      <div className='flex flex-wrap justify-center '>
        {courses.map((course) => {
          <CourseCard course={course} />
        })}
      </div>
    </>
  )
}

const CourseCard = ({ course }) => {

  const navigate = useNavigate();

  const handleBuy = ({ id }) => {
    navigate(`/users/courses/${id}`);
  }

  return (
    <div className='flex p-10 card'>
      <img src={course.imageLink || defaultImage} />
      <div className='flex flex-col justify-between ml-8'>
        <h2 className='roboto-condensed-400 text-2xl'>{course.title}</h2>
        {role === "users" ? (
          <button onClick={() => handleBuy(course._id)} className='inter-italic-400 bg-black text-white p-2 rounded-md'>BUY</button>
        ) : null}
        {localStorage.getItem("adminId") === course.creatorId ? (
          <button onClick={handleEdit} className='inter-italic-400 bg-black text-white p-2 rounded-md'>EDIT</button>
        ) : null}
      </div>
      <div className='h-px bg-black w-full'></div>
      <p className='inter-italic-400'>{course.description}</p>
    </div>
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
          <form onSubmit={handleSubmit} className='flex flex-col pl-20 py-12 mt-8'> 
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