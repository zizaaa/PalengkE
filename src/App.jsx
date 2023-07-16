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
import ProducInfo from "./Components/ProducInfo"
import NotFound from './Pages/NotFound'
import WebsitePolicies from "./Pages/WebsitePolicies"
import AdminLayout from "./admin/adminLayout"
import AdminHome from "./admin/Home"

function App() {

  return (
    <main>
      <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/shop" element={<Shop/>}>
                  <Route index element={<ShopAllProducts />}/>
                  <Route path="liveStockAndPoultryProducts" element={<ShopLivestockAndPoultry />}/>
                  <Route path="fishAndSeaShells" element={<ShopFishAndSeaShells />}/>
                  <Route path="upAndLowLandVegetables" element={<ShopUpAndLowLand />}/>
                  <Route path="fruits" element={<ShopFruits />}/> 
                  <Route path="rice" element={<ShopRice />}/>
                  <Route path="herbsAndSpices" element={<ShopSpicesAndHerbs />}/>
            </Route>
            <Route path="/contact" element={<ContactUs/>}/>
            <Route path="/policies" element={<WebsitePolicies/>}/>
          </Route>
          <Route path="/forms" element={<Forms/>}>
              <Route index element={<Register/>}/>
              <Route path="login" element={<Login/>}/>
          </Route>
          <Route path=":id" element={
              <ProducInfo />}/>
          <Route path="*" element={<NotFound/>}/>

          <Route path="/adminDashboard" element={<AdminLayout/>}>
              <Route index element={<AdminHome/>}/>
              
          </Route>
      </Routes>
    </main>
  )
}

export default App