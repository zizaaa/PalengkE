import axios from "axios"
import { FetchUsers } from "../../FetchUsers"

const ToReceive = () => {
    const { users } = FetchUsers()

    const setDelivered = async(userId,orderId)=>{

      const owner = users.find((user)=> user._id === userId)
      const selectedOrder = owner.orders.map((order)=> {
          if(order.orderId === orderId){
              const updatedItem = {...order,deliveryStatus:"delivered"}

              return updatedItem;
          }
          return order
      })

      // console.log(selectedOrder);
      try {
          const env = import.meta.env;
          const URL = env.VITE_REACT_SERVER_URL

              await axios.put(`${URL}/user/${userId}`,{
                  orders:selectedOrder
              })
              console.log('success')
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <div className="toShip-orders-container">
        {users.map((user) =>
            user.orders
            .filter((order) => order.deliveryStatus === 'toReceive' || order.deliveryStatus === 'delivered')
            .map((order,index) => (
                <div key={index} className="toShip-main-container">
                    <div className="infos-container">
                        <div className="order-infos">
                            <p>Order Id: {order.orderId}</p>
                            <p>Buyer name: {order.name}</p>
                            <p>Payment status: <span className="payment-status">{order.paymentStatus}</span></p>
                            <p>Delivery status: {order.deliveryStatus}</p>
                            <p>Total price: &#8369;{order.totalPrice}</p>
                            <p>Address: {order.address}</p>
                            <p>Mop: {order.modeOfPayment}</p>
                        </div>
                        <div className="order-list-container">
                            {
                                order.productOrders.map((product)=>(
                                    <div className="order-list" key={product.id}>
                                        <p className="product-name">
                                            {product.name}
                                        </p>
                                        <p className="price">
                                            &#8369;{product.price + ' '+ 'x' + product.item}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="button-container">
                            <button onClick={()=>{setDelivered(order.userId,order.orderId)}}>Delivered</button>
                        </div>
                    </div>
                </div>
            ))
        )}
    </div>
  )
}

export default ToReceive