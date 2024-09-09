import { useState } from 'react';
import './App.css';

const App = () => {
  const [colors, setColors] = useState(["red", "blue", "green", "white"])
  const [newColor, setNewColor] = useState("");

  const handleAdd = (newColor) => {
    console.log(colors);
  
    if(!colors.some((color) => color === newColor)) setColors([...colors, newColor]);
  }

  const handleChange = (color) => {
    document.body.style.backgroundColor = color;
  }

  return (
    <div className="container">
      <div>
        {colors.map((color) => {
          return <button key={color} style={{backgroundColor: color}} onClick={() => {handleChange(color)}}>{color}</button>
        })} 
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleAdd(newColor)}}>
        <input type='text' placeholder='Enter new color' style={{width: "100px"}} value={newColor} onChange={(e) => setNewColor(e.target.value)}/>
        <button type='submit'>Add color</button>
      </form>
    </div>
  )
}

export default App;