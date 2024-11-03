// login code here
import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

const Login = () => {
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
    const handleLogin = async(e) => {
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
            <h1 className='roboto-condensed-400 text-7xl text-center mt-40 mb-8'>Login</h1>
            <form onSubmit={handleLogin} className='flex flex-col items-center'> 
                <div className='flex flex-col'>
                    <label>Username:</label>
                    <input 
                        type='text'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p>{errors.username}</p>}
                </div>
                <div className='flex flex-col'>
                    <label>Password:</label>
                    <input 
                        type='text'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
            </form>
        </>
    )
}

export default Login