import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSelectChange = (e) => {
        if(e.target.value) {
            navigate(e.target.value);
        }
    }

    return (
        <nav className='flex ml-32 mt-10'>
            <h1 className='text-4xl albert-sans-400 flex-1 w-14'><button onClick={() => navigate("/")}>Coursify.</button></h1>
            {location.pathname === "/" ? (
                <div className='text-4xl roboto-condensed-400 mr-40'>
                    <select onChange={handleSelectChange} defaultValue="" className='mx-2 px-2 hover:bg-violet-950'>
                        <option value="" disabled>Signup</option>
                        <option value="/users/signup">User</option>
                        <option value="/admin/signup" >Admin</option>
                    </select>
                    <select onChange={handleSelectChange} defaultValue="" className='mx-2 px-2 hover:bg-violet-950'>
                        <option value="" disabled>Login</option>
                        <option value="/users/login">User</option>
                        <option value="/admin/login">Admin</option>
                    </select>
                </div>
            ) : null}
            {location.pathname === "/users/courses" ? (
                <button onClick={() => navigate("/users/purchasedCourses")} className='roboto-condensed-400 text-3xl bg-violet-900 hover:bg-violet-950 p-2 mr-32 rounded-md'>purchased courses</button>
            ) : null}
            {location.pathname === "/users/purchasedCourses" ? (
                <button onClick={() => navigate("/users/courses")} className='roboto-condensed-400 text-3xl bg-violet-900 hover:bg-violet-950 p-2 mr-32 rounded-md'>all courses</button>
            ) : null}
        </nav>
    )
}

export default Navbar