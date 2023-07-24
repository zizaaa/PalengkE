import axios from "axios"
import { TbCurrencyPeso } from "react-icons/tb"
import { FaUsers,FaShoppingCart,FaCheckDouble } from "react-icons/fa"
import { MdMarkChatUnread,MdChecklist } from "react-icons/md"
import { TbTruckDelivery } from "react-icons/tb"
import { FetchUsers } from "../FetchUsers"
import { useEffect } from "react"
import { useState } from "react"
import { FetchProduct } from "../FetchProduct"

const Home = () => {
  const env = import.meta.env;
  const URL = env.VITE_REACT_SERVER_URL
  const { authorizedUser,users } = FetchUsers()
  const { data } = FetchProduct()
  const [adminData, setAdminData] = useState([])
  const [message, setMessages] = useState([])
  const [bestSeller, setBestSeller] = useState({})
  
  useEffect(()=>{
    const fetchMessages = async()=>{
      try {
        const { data } = await axios.get(`${URL}/messages`)
          setMessages(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessages()
  },[])

  useEffect(()=>{
      const fetchAdmin = async()=>{
          try {
              const { data } = await axios.get(`${URL}/admins`)
              setAdminData(data)
            } catch (error) {
            console.log(error)
          }
      }

      fetchAdmin()

      if(data != ''){
        const bestSellerProd = data.reduce((bestSeller, currentProduct) => {
          if (currentProduct.productSold > bestSeller.productSold) {
            return currentProduct;
          } else {
            return bestSeller;
          }
        });
        
        setBestSeller(bestSellerProd);
        
        // console.log(bestSeller); 
        // console.log(bestSeller.img)
      }
  })
  
  return(
    <div className='admin-home px-md-5'>
        <div className='admin-home-head'>
            <h1>Welcome back, <span>{authorizedUser.firstName}</span></h1>
            <p>Track your performance, indentify trends, and make informed decisions with our product and sales management dashboard.</p>
        </div>
        <div className='admin-home-content'>
            <div className='income-products-users'>
                <div className='total-income'>
                    <div className='total-income-head'>
                        <span className="icon">
                          <TbCurrencyPeso/>
                        </span>
                        <p className="income-title">Gross Income</p>
                    </div>
                    <div className='total-income-body'>
                        <span className="icon">
                          <TbCurrencyPeso/>
                        </span>
                        <p className="income">
                          {
                              adminData != '' ?
                              adminData[0].grossIncome != undefined ? adminData[0].grossIncome : '0'
                              :
                                '0'
                          }
                        </p>
                    </div>
                    <div className="income-record mt-1">
                          <p className="user-record-text">
                            <span className="me-1">
                              0
                            </span>
                            last month
                          </p>
                    </div>
                </div>
                <div className='total-income'>
                    <div className='total-income-head'>
                        <span className="icon">
                          <TbCurrencyPeso/>
                        </span>
                        <p className="income-title">Net Income</p>
                    </div>
                    <div className='total-income-body'>
                        <span className="icon">
                          <TbCurrencyPeso/>
                        </span>
                        <p className="income">
                            {
                              adminData != ''  ?
                                adminData[0].netIncome != undefined ? adminData[0].netIncome :'0'
                              :
                                '0'
                            }
                        </p>
                    </div>
                    <div className="income-record mt-1">
                          <p className="user-record-text">
                            <span className="me-1">
                              0
                            </span>
                            last month
                          </p>
                    </div>
                </div>

                <div className='total-products'>
                    <div className='total-products-head'>
                        <span className="icon">
                          <FaShoppingCart/>
                        </span>
                        <p className="product-title">Products</p>
                    </div>
                    <div className='total-products-body'>
                        <p className="products">
                          {data.length}
                        </p>
                    </div>
                    <div className="products-record mt-1">
                          <p className="user-record-text">
                            <span className="me-1">
                              0
                            </span>
                            last month
                          </p>
                    </div>
                </div>

                <div className='total-users'>
                    <div className='total-users-head'>
                        <span className="icon">
                          <FaUsers/>
                        </span>
                        <p className="income-title">Users</p>
                    </div>
                    <div className='total-users-body'>
                        <p className="users">
                          {users.length}
                        </p>
                    </div>
                    <div className="user-record mt-1">
                          <p className="user-record-text">
                            <span className="me-1">
                              0
                            </span>
                            last month
                          </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="notifcation-bestSelling mt-5">
          <div className="notif-container">
            <div className="notif-head">
              <h3>
                <span className="icon">
                  <MdMarkChatUnread/>
                </span>
                Notification
              </h3>
            </div>
              <div className="notif-box-container">
                <div className="unread-container">
                    <p className="unread-count">
                      {
                        message.filter((msg) => msg.read === false).length
                      }
                    </p>
                    <div className="icon-title">
                      <span className="icon">
                        <MdMarkChatUnread/>
                      </span>
                      <p className="unread-title">Unread</p>
                    </div>
                </div>
                <div className="payments-container">
                    <p className="payment-count">
                      {users !== undefined ? 
                            users
                              .map((user) => user.orders.filter((order) => order.deliveryStatus === "completed"))
                              .map((filteredOrders) => filteredOrders.length)
                              .reduce((sum, length) => sum + length, 0)
                            : 0
                      }
                    </p>
                    <div className="icon-title">
                      <span className="icon">
                        <MdChecklist/>
                      </span>
                      <p className="payment-title">Payments</p>
                    </div>
                </div>
                <div className="transit-container">
                    <p className="transit-count">
                    {users !== undefined ? 
                      users
                        .map((user) => user.orders.filter((order) => order.deliveryStatus === "toReceive"))
                        .map((filteredOrders) => filteredOrders.length)
                        .reduce((sum, length) => sum + length, 0)
                        : 0
                    }
                    </p>
                    <div className="icon-title">
                      <span className="icon">
                        <TbTruckDelivery/>
                      </span>
                      <p className="transit-title">In transit</p>
                    </div>
                </div>
              </div>
              <p className="noti-to-view">
                <span className="me-1">
                  {
                    message.filter((msg) => msg.read === false).length
                  }
                </span>
                notification to view
              </p>
          </div>

          <div className="bestSelling-container">
            <div className="bestSelling-head">
                <h3>
                  <span className="icon">
                      <FaShoppingCart/>
                  </span>
                  Best Selling
                </h3>
            </div>
            <div className="bestSelling-view">
                <div className="bestSelling-box">
                    {
                      bestSeller.name != undefined ? 
                      <>
                      <div className="img-container">
                        <img
                          src={`${bestSeller && bestSeller.img && bestSeller.img[0] && bestSeller.img[0].imgOne ? bestSeller.img[0].imgOne : ''}`}
                          className="img-fluid"
                          alt="Best Seller"
                        />
                        </div>
                        <div className="info-container">
                            <p className="product-name">{bestSeller!=undefined ? bestSeller.name:''}</p>
                            <span className="solds">
                              <p className="count">{bestSeller!=undefined ? bestSeller.productSold:''}</p>
                              <p className="text">pcs sold</p>
                            </span>
                            <p className="record">
                              <span>1%</span>
                              higher vs  
                              <span className="mx-1">1111</span>
                              last month
                            </p>
                        </div>
                      </>
                      :'Loading...'
                    }
                </div>
            </div>
          </div>
        </div>
          <div className="home-bottom-content mt-5">
              <div className="order-overview">
                  <div className="order-overview-head">
                      <h3>
                        <span className="icon">
                          <FaShoppingCart/>
                        </span>
                        Orders Overview
                      </h3>
                  </div>
                  <div className="overview-top-content">
                      <div className="to-ship">
                          <p className="to-ship-count">
                          {users !== undefined ? 
                            users
                              .map((user) => user.orders.filter((order) => order.deliveryStatus === "toShip"))
                              .map((filteredOrders) => filteredOrders.length)
                              .reduce((sum, length) => sum + length, 0)
                            : 0
                          }
                          </p>
                          <div className="icon-title">
                              <span className="icon">
                                <TbTruckDelivery/>
                              </span>
                              <p className="title">To Ship</p>
                          </div>
                      </div>
                      <div className="to-receive">
                          <p className="to-receive-count">
                          {users !== undefined ? 
                            users
                              .map((user) => user.orders.filter((order) => order.deliveryStatus === "toReceive" || order.deliveryStatus === "delivered"))
                              .map((filteredOrders) => filteredOrders.length)
                              .reduce((sum, length) => sum + length, 0)
                            : 0
                          }
                          </p>
                          <div className="icon-title">
                              <span className="icon">
                                <MdChecklist/>
                              </span>
                              <p className="title">To Receive</p>
                          </div>
                      </div>
                      <div className="finished">
                          <p className="finished-count">
                          {users !== undefined ? 
                            users
                              .map((user) => user.orders.filter((order) => order.deliveryStatus === "completed"))
                              .map((filteredOrders) => filteredOrders.length)
                              .reduce((sum, length) => sum + length, 0)
                            : 0
                          }
                          </p>
                          <div className="icon-title">
                              <span className="icon">
                                <FaCheckDouble/>
                              </span>
                              <p className="title">Finished</p>
                          </div>
                      </div>
                  </div>
                  <div className="order-status mt-1">
                    <p className="title">Order Status</p>
                    <div className="order-table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Order Id</th>
                            <th>Status</th>
                            <th>Payment Method</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users != undefined
                            ? users.map((user) =>
                                user.orders.map((order) => (
                                  <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.deliveryStatus}</td>
                                    <td>{order.modeOfPayment}</td>
                                  </tr>
                                ))
                              )
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>
              <div className="users-login">
                <div className="users-login-top">
                    <div className="left-side">
                        <h3>
                          <span className="icon">
                            <FaUsers/>
                          </span>
                          User Logins
                        </h3>
                    </div>
                </div>
                <div className="users-table">
                  <div className="users-table-container">
                    <table>
                      <thead>
                        <tr>
                          <th className="username-th">Username</th>
                          <th className="role-th">User Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users != undefined
                          ? users.map((user,index) => (
                              <tr key={index}>
                                <td className="username">{user.userName}</td>
                                <td className="role">{user.memberShip === undefined ? "user" : user.memberShip}</td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>
                    {/*  */}
                  </div>
                  {/*  */}
                </div>
              </div>
          </div>
    </div>
  )
}


export default Home;
