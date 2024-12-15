import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../App.css"

const PetAdoptionForm = ({ onAdd }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", type: "", breed: "", owner: "", contact: "", image: "" });

  const [error, setError] = useState({});

  const validationRules = {
    name: { test: (value) => value.length >= 3, message: "Pet name should be at least 3 characters long" },
    type: { test: (value) => value.length >= 3, message: "Pet type should be at least 3 characters long" },
    breed: { test: (value) => value.length >= 3, message: "Pet breed should be at least 3 characters long" },
    owner: { test: (value) => value.length >= 3, message: "Owner name should be at least 3 characters long" },
    contact: {
      test: (value) => /^\d{10}$/.test(value),
      message: "Contact no. must be exactly 10 digits",
    },
    image: {
      test: (value) =>
        /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:[0-9]{1,5})?(\/.*)?$/.test(value),
      message: "Please enter a valid URL",
    },
  };

  const validateField = (name, value) => {
    const rule = validationRules[name];
    if (rule) {
      return rule.test(value) ? "" : rule.message;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const fieldError = validateField(name, value);
    setError((prevError) => ({
      ...prevError,
      [name]: fieldError,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const fieldError = validateField(key, formData[key]);
      if (fieldError) {
        newErrors[key] = fieldError;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
    } else {
      onAdd(formData);
      setFormData({
        name: "",
        type: "",
        breed: "",
        owner: "",
        contact: "",
        image: "",
      });
      setError({});
      navigate('/all');
    }
  };

  return (
    <div style={{ color: "gold", display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: "darkgreen", width: "50vh", padding: "40px 40px", boxShadow: "2px 2px 20px 5px black" }}>

        {["name", "type", "breed", "owner", "contact", "image"].map((field) => (
          <label key={field} className="input">
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              name={field}
              type="text"
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
            />
            {error[field] && <p>{error[field]}</p>}
          </label>
        ))}

        <button className='input' style={{ backgroundColor: "gold", color: "darkgreen", padding: "10px", borderRadius: "5px", cursor: "pointer", width: "50vh", display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0px 5px 0px" }}>Submit</button>
      </form>
    </div>
  )
}

export default PetAdoptionForm
