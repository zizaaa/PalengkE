import axios from "axios"
import { useState,useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./Pages/Home"
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {data} = await axios.get(`${URL}/products`);
      setData(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <main>
      <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}>
            </Route>
          </Route>
      </Routes>
    </main>
  )
}

export default App
