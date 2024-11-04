// register code here
import React, { useState } from 'react'
import axios from "axios"
import { useLocation } from 'react-router-dom';


const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "" });
    const [errors, setErrors] = useState({ username: "", email: "" });
    const location = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }))
    }

    // call the functions onClick of button.
    const handleSignup = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:3000${location.pathname}`, formData);
            console.log(response);
        } catch(error) {
            if (error.response && error.response.status === 400) {
                const serverErrors = error.response.data;errors;
                const newErrors = serverErrors.reduce((acc, error) => {
                    acc[error.field] = error.message;
                    return acc;
                }, {});
                setErrors(newErrors);
            }
        }
    }
    return (
        <>
            <h1 className='roboto-condensed-400 text-7xl text-center mt-40 mb-8'>Signup</h1>
            <div className='flex justify-center'>
                <form onSubmit={handleSignup} className='flex flex-col w-1/3 px-20 py-12'> 
                    <div className='flex flex-col mb-8'>
                        <label className='inter-italic-400'>Username</label>
                        <input 
                            type='text'
                            name='username'
                            className='input-long'
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p>{errors.username}</p>}
                    </div>
                    <div className='flex flex-col'>
                        <label className='inter-italic-400'>Password</label>
                        <input 
                            type='text'
                            name='password'
                            className='input-long'
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <div className='flex justify-center mt-8'>
                        <button className='roboto-condensed-400 text-3xl bg-violet-900 hover:bg-violet-950 py-2 w-24 rounded-md'>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup