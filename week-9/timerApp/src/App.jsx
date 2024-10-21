
import './App.css'

function App() {
  return (
    <div style={{ backgroundColor:'#202020', border:"solid 1px #EEEEEE", borderRadius:"10%", padding:"5px" }}>
      <h2 style={{ padding:"0 3cm", fontSize:"1cm" }}>Timer App</h2>
      <h1>00:00:00</h1>
      <div style={{ display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"10px", fontSize:"20px" }}>
        <button style={{ margin:"10px" }}>Start</button>
        <button style={{ margin:"10px" }}>Stop</button>
        <button style={{ margin:"10px" }}>Reset</button>
      </div>
      <Edit />
    </div>
  )
}

const Edit = () => {
  return (
    
    <form style={{ display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"1cm" }}>
      <select style={{ padding:"5px", fontSize:"20px", marginRight:"0.5cm", backgroundColor:"#111111", borderRadius:"10px" }}>
        <option>Hours</option>
        <option>Minutes</option>
        <option>Seconds</option>
      </select>
      <input type="text" style={{ padding:"5px", fontSize:"20px", width:"3cm", borderRadius:"10px" }} />
      <button style={{ margin:"10px", fontSize:"15px" }}>Edit</button>
    </form>
  )
}

export default App
