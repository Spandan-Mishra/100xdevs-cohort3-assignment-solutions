import React from 'react'
import { useNavigate } from 'react-router-dom'

const TableData = ({ pets }) => {

  const navigate = useNavigate();

  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column" }} >
      <table style={{ borderCollapse:"collapse", backgroundColor:"darkgreen", color:"gold", border:"solid seagreen 1px", borderRadius:"5px", fontSize:"x-large", marginTop:"50px", boxShadow:"2px 2px 20px 5px black" }} >
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Owner</th>
            <th>Contact</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet, index) => (
            <tr key={index}>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
              <td>{pet.breed}</td>
              <td>{pet.owner}</td>
              <td>{pet.contact}</td>
              <td><img src={pet.image} alt={pet.name} style={{ width:"70px", height:"70px", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"50%"  }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
        
      <button onClick={() => navigate('/')} style={{ backgroundColor:"gold", color:"darkgreen", padding:"10px", borderRadius:"5px", cursor:"pointer", width:"20vh", fontSize:"20px", display:"flex", justifyContent:"center", alignItems:"center", margin:"20px 0px 5px 0px" }}>Go Back</button>
    </div>                      
  )
}

export default TableData