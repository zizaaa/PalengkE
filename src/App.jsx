import axios from "axios"
import { useState,useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./Pages/Home"
import AboutUs from "./Pages/AboutUs"
import Shop from "./Pages/Shop"
import ContactUs from "./Pages/ContactUs"
import AllProducts from "./Components/BestSellingCategories/AllProducts"
import LiveStockAndPoultry from "./Components/BestSellingCategories/LiveStockAndPoultry"
import FishAndSeaShells from "./Components/BestSellingCategories/FishAndSeaShells"
import UpAndLowLandVege from "./Components/BestSellingCategories/UpAndLowLandVege"
import Fruits from "./Components/BestSellingCategories/Fruits"
import HerbsAndSpices from "./Components/BestSellingCategories/HerbsAndSpices"
import Rice from "./Components/BestSellingCategories/Rice"
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
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <main>
      <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}>
                <Route index element={<AllProducts data={data}/>}/>
                  <Route path="LiveStockAndPoultry" element=  {<LiveStockAndPoultry data={data}/>}/>
                    <Route path="FishAndSeaShells" element={<FishAndSeaShells data={data}/>}/>
                      <Route path="UpAndLowLandVege" element={<UpAndLowLandVege data={data}/>}/>
                    <Route path="Fruits" element={<Fruits data={data}/>}/>
                  <Route path="HerbsAndSpices" element={<HerbsAndSpices data={data}/>}/>
                <Route path="Rice" element={<Rice data={data}/>}/>
            </Route>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/contact" element={<ContactUs/>}/>
          </Route>
      </Routes>
    </main>
  )
}

export default App
