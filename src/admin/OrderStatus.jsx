
import { Link, Outlet } from "react-router-dom"

const OrderStatus = () => {

  return (
    <div className="order-status-sections px-md-5">
        <div className="head d-sm-flex d-none flex-column">
          <h1>Orders Status</h1>
          <p>Review and track orders here.</p>
          <div>
            <Link to="/adminDashboard/orders">To Ship</Link>
            <Link to="/adminDashboard/orders/toreceive">To Receive</Link>
            <Link to="/adminDashboard/orders/delivered">History</Link>
          </div>
        </div>
        <div className="orders-container mt-3">
          <Outlet/>
        </div>
    </div>
  )
}

export default OrderStatus