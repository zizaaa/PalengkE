import { TbTruckDelivery } from "react-icons/tb"
import { FetchUsers } from "../../FetchUsers"
import axios from "axios"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2';
import NoOrders from "../NoOrders";

const ToReceive = () => {
    const { authorizedUser } = FetchUsers()
    const [money, setMoney] = useState([]);
    const [loading, setLoading] = useState(false)
    const [toLoad, setToLoad] = useState('')
    const env = import.meta.env;
    const URL = env.VITE_REACT_SERVER_URL

    const recieved = async(id,income)=>{
        setLoading(true)
        setToLoad(id)
        const netIncome = income * (25 / 100)
        const grossIncome = income

        const toReceive = authorizedUser.orders.map((order)=>{
            if(order.orderId === id){
                const updatedOrder = {...order,
                    deliveryStatus :'completed',
                    paymentStatus:'paid'
                }

                return updatedOrder
            }

            return order
        })

        try {
                await axios.put(`${URL}/user/${authorizedUser._id}`,{
                    orders:toReceive
                }).then(()=>{
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Received',
                        // text: error.message,
                        confirmButtonColor:'rgb(67,94,57)'
                    });
                })

                
                //check the gross and net income in database
                    if(money[0] !== undefined){
                        const oldGrossIncome = money[0].grossIncome
                        const oldNetIncome = money[0].netIncome
                        
                            const updatedIncome = {
                                grossIncome: oldGrossIncome + grossIncome,
                                netIncome: oldNetIncome + netIncome
                            }
                            // console.log(money[0])
                                await axios.put(`${URL}/admin/${money[0]._id}`, updatedIncome)
                    }else{
                        await axios.put(`${URL}/admin/${money[0]._id}`, {
                            grossIncome:grossIncome,
                            netIncome:netIncome
                        })
                    }

                toReceive.filter((item)=>{
                    if(item.orderId === id){
                        item.productOrders.map((product)=>{
                            try {
                                
                                const updateProductSold =async(products)=>{
                                    // await axios.put()
                                    const model = {
                                        ...products,
                                        productSold:products.productSold != undefined ? products.item+products.productSold:products.item
                                    }

                                    await axios.put(`${URL}/product/${products.id}`,model)
                                }

                                updateProductSold(product)
                            } catch (error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: error.message,
                                    confirmButtonColor:'rgb(67,94,57)'
                                });
                            }
                        })
                    }
                })
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

    useEffect(()=>{
        const fetchIncome = async()=>{
            try {
                const { data } = await axios.get(`${URL}/admins`)
                setMoney(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchIncome();
    })
    return (
        <div className="client-to-ship-section">
            {
                authorizedUser.orders != undefined ? 
                    authorizedUser.orders.filter((order)=> order.deliveryStatus === 'toReceive' || order.deliveryStatus === 'delivered')
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
                            {
                                order.deliveryStatus === 'delivered' ? 
                                    <div className="right-side-toreceive">
                                        {/* <button onClick={()=>{recieved(order.orderId,order.totalPrice)}}>Order Received</button> */}
                                        <div className={`${loading && toLoad === order.orderId ? 'spinner':''}`} id={order.orderId}>
                                            <div className={`${loading && toLoad === order.orderId ? 'spinner-border':'spinner-custom'}`} role="status">
                                                <button className={`${loading && toLoad === order.orderId ? 'visually-hidden':''}`} type='button' onClick={()=>{recieved(order.orderId,order.totalPrice)}}>Order Received</button>
                                            </div>
                                        </div>
                                    </div>
                                :
                                    <div className="center-side">
                                        <p>
                                            Your order is on the way...
                                        </p>
                                        <span className="icon">
                                            <TbTruckDelivery/>
                                        </span>
                                    </div>
                            }
                        </div>
                    ))
                :
                    <NoOrders/>
            }
        </div>
    )
}

export default ToReceive