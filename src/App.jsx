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
import Forms from "./Pages/Forms"
import Register from "./Components/FromsComponents/Register"
import Login from "./Components/FromsComponents/Login"
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL

function App() {
  const [data, setData] = useState([]);
  const [authorizedId, setAuthorizedId] = useState(null);
  const [authorizedUser, setauthorizedUser] = useState({});

  useEffect(() => {
    setAuthorizedId(sessionStorage.getItem('userId'))
    fetchData();
  },[]);

  useEffect(() => {
    fetchUserData();
  });

  // products
  const fetchData = async () => {
    try {
      const {data} = await axios.get(`${URL}/products`);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  //users
  const fetchUserData = async () => {
    try {
      const {data} = await axios.get(`${URL}/users`);
          await data.filter((user)=> authorizedId === user._id ? setauthorizedUser(user):null)
    } catch (error) {
      console.error(error);
    }
  };

  const [itemsPerPages, setItemsPerPages] = useState(4)
  //product best sell resizer
  window.addEventListener('resize', ()=>{
    if (window.innerWidth <= 763) {
        setItemsPerPages(1);
    }else{
      setItemsPerPages(4)
    }
  });
  return (
    <main>
      <Routes>
          <Route element={<Layout authorizedId={authorizedId} authorizedUser={authorizedUser}/>}>
            <Route path="/" element={<Home />}>
                <Route index element={
                    <AllProducts data={data} 
                        itemsPerPages={itemsPerPages}
                          authorizedUser={authorizedUser} 
                          // fetchUserData={fetchUserData}
                          />}/>
                  <Route path="LiveStockAndPoultry" element=  {
                      <LiveStockAndPoultry 
                          data={data}
                            itemsPerPages={itemsPerPages}
                          />}/>
                    <Route path="FishAndSeaShells" element={
                      <FishAndSeaShells 
                          data={data}
                            itemsPerPages={itemsPerPages}
                          />}/>
                      <Route path="UpAndLowLandVege" element={
                        <UpAndLowLandVege 
                            data={data}
                              itemsPerPages={itemsPerPages}
                            />}/>
                    <Route path="Fruits" element={<Fruits data={data}/>}/>
                  <Route path="HerbsAndSpices" element={<HerbsAndSpices data={data}/>}/>
                <Route path="Rice" element={<Rice data={data}/>}/>
            </Route>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/contact" element={<ContactUs/>}/>
          </Route>
          <Route path="/forms" element={<Forms/>}>
              <Route index element={<Register/>}/>
              <Route path="login" element={<Login/>}/>
          </Route>
      </Routes>
    </main>
  )
}

export default App
