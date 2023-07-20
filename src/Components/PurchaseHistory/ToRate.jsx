import { useState } from "react";
import { FetchUsers } from "../../FetchUsers";
import { FetchProduct } from "../../FetchProduct";
import axios from "axios";
import Swal from 'sweetalert2';

const ToRate = () => {
    const { authorizedUser } = FetchUsers()
    const { data } = FetchProduct()
    const [ratings, setRatings] = useState(0);
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const [toLoad, setToLoad] = useState(false)


    const env = import.meta.env;
    const URL = env.VITE_REACT_SERVER_URL

    const submitRating =async(productID,orderID)=>{
        //date
        const myDate = new Date(); // Set myDate to the current date

        const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(myDate);

        
        if(comment && ratings){
            setLoading(true)
            setToLoad(productID)
            // add reviews to product
            data.find((product)=>{
                if(product._id === productID){
                    const updatedProduct = {
                        usersProductReviews:[...product.usersProductReviews,{
                            name:authorizedUser.firstName,
                            date:formattedDate,
                            message:comment,
                            stars:ratings
                        }]
                    }

                    const updateProductReviews = async()=>{
                        try {
                            await axios.put(`${URL}/product/${productID}`,updatedProduct)
                            .then(()=>{
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Reviews recorded',
                                    confirmButtonColor:'rgb(67,94,57)'
                                });
                            })
                        } catch (error) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: error.message,
                                confirmButtonColor:'rgb(67,94,57)'
                            });
                        }
                    }
                    updateProductReviews()
                }
            })

            //update rated status
            const updatedOrders = authorizedUser.orders.map((order)=>{
                if(order.orderId === orderID){
                    const updated = order.productOrders.map((product)=>{
                        if(product.id === productID){
                            const rated = {
                                ...product,
                                rated:true
                            }
                            return rated
                        }

                        return product
                    })

                    const updatedOrder = {
                        ...order,
                        productOrders:updated
                    }

                    return updatedOrder
                }

                return order
            })

            try {
                await axios.put(`${URL}/user/${authorizedUser._id}`,{
                    orders:updatedOrders
                })
                console.log('orders updated')
                setLoading(false)
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                    confirmButtonColor:'rgb(67,94,57)'
                });
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Please input your reviews",
                confirmButtonColor:'rgb(67,94,57)'
            });
        }
    }

  return (
    <div className="client-to-rate-sections">
        {
            authorizedUser.orders != undefined ? 
                authorizedUser.orders.filter((order)=> order.deliveryStatus === 'completed')
                .map((order)=>(
                    order.productOrders.map((product,index)=>(
                        product.rated === false ? 
                            <div className="client-product-boxes" key={product.id}>
                                <div className="left-side">
                                    <div className="img-container">
                                        <img src={product.img[0].imgOne}/>
                                    </div>
                                    <div className="product-ids-price">
                                        <p className="price">Product price: &#8369;{product.sale ? product.newPrice:product.price}</p>
                                        {/* <p className="name">Product name: {product.name}</p> */}
                                        <p className="id">Order ID: {order.orderId}</p>
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div className="comment-container">
                                        <textarea type="text" onChange={(e)=>{setComment(e.target.value)}} placeholder="Please type here your comments and suggestions"></textarea>
                                    </div>
                                    <div className="rating-button-container">
                                        <div className="rate">
                                            <input type="radio" id="star5" name="rate" onChange={(e)=>{setRatings(e.target.value)}} value="5" />
                                            <label htmlFor="star5" title="ratings">5 stars</label>
                                            <input type="radio" id="star4" name="rate" onChange={(e)=>{setRatings(e.target.value)}} value="4" />
                                            <label htmlFor="star4" title="ratings">4 stars</label>
                                            <input type="radio" id="star3" name="rate" onChange={(e)=>{setRatings(e.target.value)}} value="3" />
                                            <label htmlFor="star3" title="ratings">3 stars</label>
                                            <input type="radio" id="star2" name="rate" onChange={(e)=>{setRatings(e.target.value)}} value="2" />
                                            <label htmlFor="star2" title="ratings">2 stars</label>
                                            <input type="radio" id="star1" name="rate" onChange={(e)=>{setRatings(e.target.value)}} value="1" />
                                            <label htmlFor="star1" title="ratings">1 star</label>
                                        </div>
                                        <div className="button">
                                            {/* <button onClick={()=>{submitRating(product.id,order.orderId)}}>Submit Rating</button> */}
                                            <div className={`${loading && toLoad === product.id ? 'spinner':''}`} id={product.id}>
                                                <div className={`${loading && toLoad === product.id ? 'spinner-border':'spinner-custom'}`} role="status">
                                                    <button className={`${loading && toLoad === product.id ? 'visually-hidden':''}`} type='button' onClick={()=>{submitRating(product.id,order.orderId)}}>Submit Rating</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                            ''
                        
                    ))
                ))
            :
                'No orders'
        }
    </div>
  )
}

export default ToRate
