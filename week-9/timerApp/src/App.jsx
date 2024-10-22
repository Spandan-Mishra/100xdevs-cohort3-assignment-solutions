import { useState } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState({ 
    hours: 0,
    minutes: 0,
    seconds: 0
   });
  const [isRunning, setIsRunning] = useState(false);
  const [editField, setEditField] = useState("");

  return (
    <div style={{ backgroundColor:'#202020', border:"solid 1px #EEEEEE", borderRadius:"10%", padding:"5px" }}>
      <h2 style={{ padding:"0 3cm", fontSize:"1cm" }}>Timer App</h2>
      <Clock time={time} editField={editField} setTime={setTime} setEditField={setEditField}/>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"10px", fontSize:"20px" }}>
        <button style={{ margin:"10px" }}>Start</button>
        <button style={{ margin:"10px" }}>Stop</button>
        <button style={{ margin:"10px" }}>Reset</button>
      </div>
    </div>
  )
}

const Clock = ({ time, setTime, editField, setEditField }) => {

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    const newValue = parseInt(value);

    if (!isNaN(newValue)) {
      setTime((prevTime) => ({
        ...prevTime,
        [name]: newValue
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setEditField("")
    }
  }

  return (
    <h2 style={{ display:"flex", justifyContent:"center", alignItems:"center" }} >
      <div>
        {editField === "hours"
          ? (
          <input 
            type='text'
            name='hours'
            value={time.hours}
            onChange={handleInputChange()}
            onKeyDown={handleKeyDown()}
          />
        )
          : (
          <div onClick={() => (setEditField("hours"))}>
            {String(time.hours).padStart(2, '0')}
          </div>
          )}
      </div>
      :
      <div>
        {editField === "minutes"
          ? (
          <input 
            type='text'
            name='minutes'
            value={time.minutes}
            onChange={handleInputChange()}
            onKeyDown={handleKeyDown()}
          />
        )
          : (
          <div onClick={() => (setEditField("minutes"))}>
            {String(time.minutes).padStart(2, '0')}              
          </div>
          )}
      </div>
      :
      <div>
        {editField === "seconds"
          ? (
          <input 
            type='text'
            name='seconds'
            value={time.seconds}
            onChange={handleInputChange()}
            onKeyDown={handleKeyDown()}
          />
        )
          : (
          <div onClick={() => (setEditField("seconds"))}>
            {String(time.seconds).padStart(2, '0')}
          </div>
          )}
      </div>
    </h2>
  )
}

export default App
