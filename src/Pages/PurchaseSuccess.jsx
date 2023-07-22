import { Link } from 'react-router-dom'
import cartImage from '../assets/cart.png'

const PurchaseSuccess = () => {

  return (
    <div className="finish-page-container"> 
        <div className="img-container">
          <img src={cartImage} className='img-fluid'/>
        </div>
        <h2>Your order is being processed. <br/> Thank you for your purchase!</h2>
        <Link to='/shop' className="button">Go to Shop</Link>
    </div>
  )
}

export default PurchaseSuccess