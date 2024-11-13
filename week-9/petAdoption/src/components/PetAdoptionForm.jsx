import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css"

const PetAdoptionForm = ({ onAdd }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({name:"", type:"", breed:"", owner:"", contact:"", image:""});
  const [error, setError] = useState({nameError:"", typeError:"", breedError:"", ownerError:"", contactError:"", imageError:""});

  const isValid = async (pets, e, checkAll) => {
    if((checkAll || e.target.name == "name") && pets.name.length < 3 ) {
      await setError((prevError) => ({
        ...prevError,
        nameError: "Pet name should be at least 3 characters long"
      }))
    } else {
      await setError((prevError) => ({
        ...prevError,
        nameError: ""
      }))
    }

    if((checkAll || e.target.name == "type") && pets.type.length < 3) {
      await setError((prevError) => ({
        ...prevError,
        typeError: "Pet type should be at least 3 characters long"
      }))
    } else {
      await setError((prevError) => ({
        ...prevError,
        typeError: ""
      }))
    }

    if((checkAll || e.target.name == "breed") && pets.breed.length < 3) {
      await setError((prevError) => ({
        ...prevError,
        breedError: "Pet breed should be at least 3 characters long"
      }))
    } else {
      await setError((prevError) => ({
        ...prevError,
        breedError: ""
      }))
    }

    if((checkAll || e.target.name == "owner") && pets.owner.length < 3) {
      console.log(pets.owner.length)
      await setError((prevError) => ({
        ...prevError,
        ownerError: "Owner name should be at least 3 characters long"
      }))
    } else {
      await setError((prevError) => ({
        ...prevError
        ownerError: ""
      }))
    }

    if((checkAll || e.target.name == "contact") && pets.contact.length != 10 && /^\d+$/.test(pets.contact) == false) {
      console.log(/^\d+$/.test(pets.contact) == false)
      await setError((prevError) => ({
        ...prevError,
        contactError: "Contact no. should be at least 10 characters long (only numbers)"
      }))
    } else {
      await setError((prevError) => ({
        ...prevError,
        contactError: ""
      }))
    }
    
    const isValidImageUrl = pets.image.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if((checkAll || e.target.name == "image") && isValidImageUrl == null) {
      await setError((prevError) => ({
        ...prevError,
        imageError: "Please enter a valid image URL"
      }))
    } else {
      await setError((prevError) => ({
        ...prevError,
        imageError: ""
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, type, breed, owner, contact, image } = formData;

    const newPet = { name, type, breed, owner, contact, image };

    if(isValid(formData, e, true)) {
      onAdd(newPet);
      setFormData({name:"", type:"", breed:"", owner:"", contact:"", image:""});
      setError({nameError:"", typeError:"", breedError:"", ownerError:"", contactError:"", imageError:""});
      navigate('/all');
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    isValid(formData, e, false);
  }

  return (
    <div style={{ color:"gold", display:"flex", justifyContent:"center", marginTop:"50px" }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor:"darkgreen", width:"50vh", padding:"40px 40px", boxShadow:"2px 2px 20px 5px black" }}>
        <label className='input'>
          Name: <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder='Enter pet name'/>
          {error.nameError && <p>{error.nameError}</p>}
        </label>
        <label className='input'>
          Pet Type: <input name='type' type="text" value={formData.type} onChange={handleChange} placeholder='Enter pet type'/>
          {error.typeError && <p>{error.typeError}</p>}
        </label>
        <label className='input'>
          Breed: <input name='breed' type="text" value={formData.breed} onChange={handleChange} placeholder='Enter pet breed'/>
          {error.breedError && <p>{error.breedError}</p>}
        </label>
        <label className='input'>
          Owner&apos;s Name: <input name='owner' type="text" value={formData.owner} onChange={handleChange} placeholder='Enter owner name'/>
          {error.ownerError && <p>{error.ownerError}</p>}
        </label>
        <label className='input'>
          Contact No.: <input name='contact' type="text" value={formData.contact} onChange={handleChange} placeholder='Enter contact no.'/>
          {error.contactError && <p>{error.contactError}</p>}
        </label>
        <label className='input'>
          Pet Image: <input name='image' type="text" value={formData.image} onChange={handleChange} placeholder='Enter pet image link'/>
          {error.imageError && <p>{error.imageError}</p>}
        </label>
        <button className='input' style={{ backgroundColor:"gold", color:"darkgreen", padding:"10px", borderRadius:"5px", cursor:"pointer", width:"50vh", display:"flex", justifyContent:"center", alignItems:"center", margin:"20px 0px 5px 0px" }}>Submit</button>
      </form>
    </div>
  )
}

export default PetAdoptionForm