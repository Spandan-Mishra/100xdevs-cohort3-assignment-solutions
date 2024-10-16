import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import PetAdoptionForm from './components/PetAdoptionForm';
import TableData from './components/TableData';
import Header from './components/Header';
import './App.css';
import { useState } from 'react';

function App() {
  const [pets, setPets] = useState([]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PetAdoptionForm pets={pets} setPets={setPets} />} />
        <Route path="all" element={<TableData pets={pets}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
