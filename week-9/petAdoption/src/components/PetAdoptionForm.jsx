import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css"

const PetAdoptionForm = ({ onAdd }) => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const typeRef = useRef();
  const breedRef = useRef();
  const ownerRef = useRef();
  const contactRef = useRef();
  const imageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const type = typeRef.current.value;
    const breed = breedRef.current.value;
    const owner = ownerRef.current.value;
    const contact = contactRef.current.value;
    const image = imageRef.current.value;

    const newPet = { name, type, breed, owner, contact, image };

    onAdd(newPet);
    navigate('/all');
  }

  return (
    <div style={{ color:"gold", display:"flex", justifyContent:"center", marginTop:"50px" }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor:"darkgreen", width:"50vh", padding:"40px 40px", boxShadow:"2px 2px 20px 5px black" }}>
        <label className='input'>
          Name: <input type="text" ref={nameRef}/>
        </label>
        <label className='input'>
          Pet Type: <input type="text" ref={typeRef}/>
        </label>
        <label className='input'>
          Breed: <input type="text" ref={breedRef}/>
        </label>
        <label className='input'>
          Owner&apos;s Name: <input type="text" ref={ownerRef}/>
        </label>
        <label className='input'>
          Contact No.: <input type="text" ref={contactRef}/>
        </label>
        <label className='input'>
          Pet Image: <input type="text" ref={imageRef}/>
        </label>
        <button className='input' style={{ backgroundColor:"gold", color:"darkgreen", padding:"10px", borderRadius:"5px", cursor:"pointer", width:"50vh", display:"flex", justifyContent:"center", alignItems:"center", margin:"20px 0px 5px 0px" }}>Submit</button>
      </form>
    </div>
  )
}

export default PetAdoptionForm