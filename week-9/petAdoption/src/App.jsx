import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import PetAdoptionForm from './components/PetAdoptionForm';
import TableData from './components/TableData';
import Header from './components/Header';
import './App.css';
import { useState } from 'react';

function App() {
  const [pets, setPets] = useState([]);

  const handleAdd = (newPet) => {
    setPets((prevPets) => ([...prevPets, newPet]));
  } 

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PetAdoptionForm onAdd={handleAdd} />} />
        <Route path="all" element={<TableData pets={pets}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
