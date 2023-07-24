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
import AdminLayout from "./admin/AdminLayout"
import AdminHome from "./admin/Home"
import AdminProducts from "./admin/Products"
import AdminUsers from "./admin/Users"
import AdminOrderStatus from "./admin/OrderStatus"
import AdminNotifications from "./admin/Notifications"
// import AdminSettings from "./admin/Settings"
import PurchaseSuccess from "./Pages/PurchaseSuccess"
import AdminProduct from "./admin/AdminProduct"
import AddProductForm from "./Components/AddProductForm"
import EditProductForm from "./Components/EditProductForm"
import UsersList from "./admin/UsersList"
import ToShip from "./admin/Components/ToShip"
import ToReceive from "./admin/Components/ToReceive"
import Delivered from "./admin/Components/Delivered"
import Messages from "./admin/Components/Messages"
import DisplayMessage from "./admin/Components/DisplayMessage"
import AccountDetails from "./Pages/AccountDetails"
import ClientToShip from "./Components/PurchaseHistory/ToShip"
import ClientToReceive from "./Components/PurchaseHistory/ToReceive"
import ClientCompleted from "./Components/PurchaseHistory/Completed"
import ClientToRate from "./Components/PurchaseHistory/ToRate"
import ClientCancelled from "./Components/PurchaseHistory/Cancelled"
import jwtDecode from 'jwt-decode';
import GiveAway from "./admin/Components/GiveAway"

function App() {
  // Your logic to determine if the user is validated (e.g., based on the token)
  const isValidToken = () => {
    const token = localStorage.getItem('access'); // Replace with how you store your token
    if (!token) {
      return false; // No token found, not validated
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

      // Check if the token's expiration time is in the future
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false; // Error decoding token or expired, not validated
    }
  };

  const validated = isValidToken(); 

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
            <Route path="/accountDetailsAndHistory" element={<AccountDetails/>}>
              <Route index element={<ClientToShip/>}/>
              <Route path="/accountDetailsAndHistory/torecieve" element={<ClientToReceive/>}/>
              <Route path="/accountDetailsAndHistory/torate" element={<ClientToRate/>}/>
              <Route path="/accountDetailsAndHistory/completed" element={<ClientCompleted/>}/>
              <Route path="/accountDetailsAndHistory/cancelled" element={<ClientCancelled/>}/>
            </Route>
            <Route path="/success" element={<PurchaseSuccess/>}/>
          </Route>
          <Route path="/forms" element={<Forms/>}>
              <Route index element={<Register/>}/>
              <Route path="login" element={<Login/>}/>
          </Route>
          <Route path="/productInfo/:id" element={<ProducInfo />}/>

            {
              validated ? 
              (
                <Route path="/adminDashboard" element={<AdminLayout/>}>
                    <Route index element={<AdminHome/>}/>

                    <Route path="/adminDashboard/products" element={<AdminProducts/>}>
                        <Route index element={<AdminProduct/>}/>
                        <Route path="/adminDashboard/products/addproduct" element={<AddProductForm/>}/>
                        <Route path="/adminDashboard/products/editproduct/:id" element={<EditProductForm/>}/>
                    </Route>

                    <Route path="/adminDashboard/users" element={<AdminUsers/>}>
                        <Route index element={<UsersList/>}/>
                    </Route>

                    <Route path="/adminDashboard/orders" element={<AdminOrderStatus/>}>
                      <Route index element={<ToShip/>}/>
                      <Route path="/adminDashboard/orders/toreceive" element={<ToReceive/>}/>
                      <Route path="/adminDashboard/orders/delivered" element={<Delivered/>}/>
                    </Route>

                    <Route path="/adminDashboard/notifications" element={<AdminNotifications/>}>
                        <Route index element={<Messages/>}/>
                        <Route path='/adminDashboard/notifications/message/:id' element={<DisplayMessage/>}/>
                    </Route>

                    <Route path="/adminDashboard/giveAway" element={<GiveAway/>}/>
                    
                    {/* <Route path="/adminDashboard/settings" element={<AdminSettings/>}/> */}
                </Route>
              ):
              ''
            }
          
          <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default App