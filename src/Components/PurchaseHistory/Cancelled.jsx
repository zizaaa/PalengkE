import { useState } from "react"
import { FetchUsers } from "../../FetchUsers"
import axios from "axios"
import Swal from 'sweetalert2';

const Cancelled = () => {
    const { authorizedUser } = FetchUsers()
    const [loading, setLoading] = useState(false)
    const [toLoad, setToLoad] = useState('')

    const buyAgain = async(id)=>{
      setLoading(true)
      setToLoad(id)
        const toShip = authorizedUser.orders.map((order)=>{
            if(order.orderId === id){
                const updatedOrder = {...order,deliveryStatus :'toShip'}

                return updatedOrder
            }

            return order
        })

        try {
            const env = import.meta.env;
            const URL = env.VITE_REACT_SERVER_URL

                await axios.put(`${URL}/user/${authorizedUser._id}`,{
                    orders:toShip
                }).then(()=>{
                    Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      confirmButtonColor:'rgb(67,94,57)'
                    });
                  });
                setLoading(false)
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message,
            confirmButtonColor:'rgb(67,94,57)'
          });
        }
    }
    return (
        <div className="client-to-ship-section">
            {
                authorizedUser.orders != undefined ? 
                    authorizedUser.orders.filter((order)=> order.deliveryStatus === 'cancelled')
                    .map((order)=>(
                        <div className="client-to-ship-box" key={order.orderId}>
                            <div className="left-side">
                                
                                <div className="price-and-id">
                                    <p className="total-price">
                                        Total Price: &#8369;{order.totalPrice}
                                    </p>
                                    <p className="order-id">
                                        Order ID: {order.orderId}
                                    </p>
                                </div>
                                <div className="order-list">
                                    {
                                        order.productOrders.map((item)=>(
                                            <div className="order-list-box" key={item.id}>
                                                <p className="product-name">
                                                    {
                                                        item.name
                                                    }
                                                </p>
                                                <p>
                                                    x
                                                    {
                                                        item.item
                                                    }
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="right-side-cancelled">
                                {/* <button onClick={()=>{buyAgain(order.orderId)}}>Buy Again</button> */}
                                <div className={`${loading && toLoad === order.orderId ? 'spinner':''}`} id={order.orderId}>
                                    <div className={`${loading && toLoad === order.orderId ? 'spinner-border':'spinner-custom'}`} role="status">
                                        <button className={`${loading && toLoad === order.orderId ? 'visually-hidden':''}`} type='button' onClick={()=>{buyAgain(order.orderId)}}>Buy Again</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                :
                    'No Orders'
            }
        </div>
    )
}

export default Cancelled