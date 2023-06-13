// import axios from "axios"
// import { useState,useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./Pages/Home"
import AllCategory from "./Components/BestSelling/AllCategory"
import LiveStockAndPoultry from "./Components/BestSelling/LiveStockAndPoultry"
import FishandSeaShells from "./Components/BestSelling/FishandSeaShells"
import UpAndLowLandVege from "./Components/BestSelling/UpAndLowLandVege"
import Fruits from "./Components/BestSelling/Fruits"
import HerbsAndSpices from "./Components/BestSelling/HerbsAndSpices"
import Rice from "./Components/BestSelling/Rice"
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
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}>
                <Route index element={<AllCategory/>}/>
                <Route path="LiveStockAndPoultry" element={<LiveStockAndPoultry/>}/>
                <Route path="FishandSeaShells" element={<FishandSeaShells/>}/>
                <Route path="UpAndLowLandVege" element={<UpAndLowLandVege/>}/>
                <Route path="Fruits" element={<Fruits/>}/>
                <Route path="HerbsAndSpices" element={<HerbsAndSpices/>}/>
                <Route path="Rice" element={<Rice/>}/>
            </Route>
          </Route>
      </Routes>
    </main>
  )
}

export default App
