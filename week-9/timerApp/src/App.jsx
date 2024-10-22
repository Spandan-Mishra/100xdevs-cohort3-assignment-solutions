import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState({ 
    hours: 0,
    minutes: 0,
    seconds: 0
   });
  const [isRunning, setIsRunning] = useState(false);
  const [editField, setEditField] = useState("");

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;

          seconds += 1;
          if (seconds >= 60) {
            seconds = Math.max(0, seconds - 60);
            minutes += 1;
          }
          if (minutes >= 60) {
            minutes = Math.max(0, minutes - 60);
            hours += 1;
          }

          if((hours === 99 && minutes === 60 && seconds === 60) || hours > 99) {
            setIsRunning(false)
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setTime({ hours:0, minutes:0, seconds:0 });
  }

  return (
    <div style={{ backgroundColor:'#191919', border:"solid 1px #EEEEEE", borderRadius:"10%", padding:"5px" }}>
      <h2 style={{ padding:"0 3cm", fontSize:"1cm" }}>Timer App</h2>
      <Clock time={time} editField={editField} setTime={setTime} setEditField={setEditField} setIsRunning={setIsRunning} />
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"25px", fontSize:"20px" }}>
        <button onClick={() => (setIsRunning(true))}   style={{ margin:"10px" }}>Start</button>
        <button onClick={() => (setIsRunning(false))} style={{ margin:"10px" }}>Stop</button>
        <button onClick={handleReset} style={{ margin:"10px" }}>Reset</button>
      </div>
    </div>
  )
}

const Clock = ({ time, setTime, editField, setEditField, setIsRunning }) => {

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    const newValue = parseInt(value);

    if(value === "") {
      setTime((prevTime) => ({
        ...prevTime,
        [name]: 0
      }))
    }

    if (!isNaN(newValue)) {
      setTime((prevTime) => ({
        ...prevTime,
        [name]: newValue
      }));
    } 
  };

  const handleKeyDown = (e) => {

    if(e.target.value >= 100) {
      setError("Please enter 2 digit numbers");
      return ;
    } else {
      setError("");
    }

    if (e.key === 'Enter') {
      setEditField("")
      setIsRunning(true);
    }
  }

  const handleClick = (field) => {
    setEditField(field);
    setIsRunning(false);
  }

  return (
    <>
      <h1 style={{ display:"flex", justifyContent:"center", alignItems:"center" }} >
        <div>
          {editField === "hours"
            ? (
            <input 
              type='text'
              name='hours'
              value={time.hours}
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          )
            : (
            <div onClick={() => (handleClick("hours"))}>
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
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          )
            : (
            <div onClick={() => (handleClick("minutes"))}>
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
              onChange={(e) => handleInputChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          )
            : (
            <div onClick={() => (handleClick("seconds"))}>
              {String(time.seconds).padStart(2, '0')}
            </div>
            )}
        </div>
      </h1>
      {error && <p style={{ fontStyle:"italic", color:"red" }}>{error}</p>}
    </>
  )
}

export default App
