// import axios from "axios"
// import { useState,useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./Pages/Home"
// const env = import.meta.env;
// const URL = env.VITE_REACT_SERVER_URL

function App() {
  // const[name,setName] = useState('');
  // const[email,setEmail] = useState('');
  // const[address,setAddress] = useState('');
  // const[number,setNumber] = useState(0);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const {data} = await axios.get(`${URL}/products`);
  //     setData(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const submit= async(e)=>{
  //   e.preventDefault();
  //   try{
  //     const option = {
  //       name:name,
  //       "email":email,
  //       "number":number,
  //       "address":address,
  //     }
  //     await axios.post(`${URL}/users`,option)
  //   }catch(error){
  //     alert(error)
  //   }
  // }
  return (
    <main>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
          </Route>
      </Routes>
    </main>
  )
}

export default App
