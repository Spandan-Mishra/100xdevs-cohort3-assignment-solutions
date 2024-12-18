// firstly, Don't get overwhelmed and if you are then go with client-easy.
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Courses from "./components/Courses"
import Navbar from "./components/Navbar"
function App() {

  return (
    <>
      {/* start  writing from here */}
       <BrowserRouter>
       <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:role/login" element={<Login />} />
          <Route path="/:role/signup" element={<Signup />} />
          <Route path="/:role/courses" element={<Courses />} />
        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
