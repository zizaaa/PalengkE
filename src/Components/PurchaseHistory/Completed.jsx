import { FetchUsers } from "../../FetchUsers";
import NoOrders from "../NoOrders";

const Completed = () => {
    const { authorizedUser } = FetchUsers()

  return (
    <div className="client-to-rate-sections">
        {
            authorizedUser.orders != undefined ? 
                authorizedUser.orders.filter((order)=> order.deliveryStatus === 'completed')
                .map((order)=>(
                    order.productOrders.map((product)=>(
                            <div className="client-product-boxes" key={product.id}>
                                <div className="left-side">
                                    <div className="img-container">
                                        <img src={product.img[0].imgOne}/>
                                    </div>
                                    <div className="product-ids-price">
                                        <p className="id">Order ID: {order.orderId}</p>
                                        <p className="price">Product price: &#8369;{product.sale ? product.newPrice:product.price}</p>
                                        <p className="name">Product name: {product.name}</p>
                                    </div>
                                </div>
                            </div>
                    ))
                ))
            :
                <NoOrders/>
        }
    </div>
  )
}

export default Completed
