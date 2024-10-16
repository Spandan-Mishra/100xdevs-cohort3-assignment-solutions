import React from 'react'
import "../App.css"

const PetAdoptionForm = () => {

  

  return (
    <div style={{ color:"gold", display:"flex", justifyContent:"center", marginTop:"50px" }}>
      <div style={{ backgroundColor:"darkgreen", width:"50vh", padding:"40px 40px", boxShadow:"5px 5px 50px 5px black" }}>
        <label className='input'>
          Name: <input type="text" />
        </label>
        <label className='input'>
          Pet Type: <input type="text" />
        </label>
        <label className='input'>
          Breed: <input type="text" />
        </label>
        <label className='input'>
          Owner&apos;s Name: <input type="text" />
        </label>
        <label className='input'>
          Contact No.: <input type="text" />
        </label>
        <label className='input'>
          Pet Image: <input type="text" />
        </label>
        <button className='input' style={{ backgroundColor:"gold", color:"darkgreen", padding:"10px", borderRadius:"5px", cursor:"pointer", width:"50vh", display:"flex", justifyContent:"center", alignItems:"center", margin:"20px 0px 5px 0px" }}>Submit</button>
      </div>
    </div>
  )
}

export default PetAdoptionForm