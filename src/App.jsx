import axios from "axios"
import { useState,useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./Components/Layout"
import Home from "./Pages/Home"
import AboutUs from "./Pages/AboutUs"
import Shop from "./Pages/Shop"
import ContactUs from "./Pages/ContactUs"
import Forms from "./Pages/Forms"
import Register from "./Components/FromsComponents/Register"
import Login from "./Components/FromsComponents/Login"
import ShopAllProducts from './Components/Shop/AllProducts'
import ShopLivestockAndPoultry from './Components/Shop/LiveStockAndPoulrty'
import ShopFishAndSeaShells from './Components/Shop/FishAndSeaShells'
import ShopUpAndLowLand from './Components/Shop/UpAndLowLand'
import ShopFruits from './Components/Shop/Fruits'
import ShopRice from './Components/Shop/Rice'
import ShopSpicesAndHerbs from './Components/Shop/HerbsAndSpices'
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

  return (
    <main>
      <Routes>
          <Route element={<Layout authorizedId={authorizedId} authorizedUser={authorizedUser} data={data} />}>
            <Route path="/" element={<Home 
                data={data}
                  authorizedUser={authorizedUser}/>}>
            </Route>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/shop" element={<Shop/>}>
                  <Route index element={<ShopAllProducts data={data} authorizedUser={authorizedUser}/>}/>
                  <Route path="liveStockAndPoultryProducts" element={<ShopLivestockAndPoultry data={data} authorizedUser={authorizedUser}/>}/>
                  <Route path="fishAndSeaShells" element={<ShopFishAndSeaShells data={data} authorizedUser={authorizedUser}/>}/>
                  <Route path="upAndLowLandVegetables" element={<ShopUpAndLowLand data={data} authorizedUser={authorizedUser}/>}/>
                  <Route path="fruits" element={<ShopFruits data={data} authorizedUser={authorizedUser}/>}/>
                  <Route path="rice" element={<ShopRice data={data} authorizedUser={authorizedUser}/>}/>
                  <Route path="herbsAndSpices" element={<ShopSpicesAndHerbs data={data} authorizedUser={authorizedUser}/>}/>
            </Route>
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