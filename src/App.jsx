import axios from "axios"
import { useState,useEffect } from "react"

const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL

function App() {
  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[address,setAddress] = useState('');
  const[number,setNumber] = useState(0);
  const [data, setData] = useState([]);
 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {data} = await axios.get(`https://palengke-api-vl03.onrender.com/users`);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const submit= async(e)=>{
    e.preventDefault()
    try{
      const option = {
        name:name,
        "email":email,
        "number":number,
        "address":address,
      }
      await axios.post(`https://palengke-api-vl03.onrender.com/users`,option)
    }catch(error){
      alert(error)
    }
  }
  return (
    <section>
      <form>
        <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="Name"/>
        <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"/>
        <input type="text" onChange={(e)=>{setNumber(e.target.value)}} placeholder="Number"/>
        <input type="text" onChange={(e)=>{setAddress(e.target.value)}} placeholder="Address"/>
        <button type="submit" onClick={submit}>Submit</button>
      </form>
      {data.map((item)=>(
        <div key={item._id}>
          <p>Name: {item.name}</p>
          <p>Key: {item._id}</p>
        </div>
      ))}
    </section>
  )
}

export default App
