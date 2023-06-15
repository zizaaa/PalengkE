
import { Link } from "react-router-dom"
import { AiOutlineSwapRight } from 'react-icons/ai'

const BestSellingProduct = () => {
  return (
    <section className="mt-5">
        <div className="container">
            <div className="bestselling-head-container">
                <h1>Best Selling Products</h1>
                <Link to='/shop' className="viewAll-btn">View All Products <span><AiOutlineSwapRight className="arrow-icon"/></span></Link>
            </div>
            <div className="bestSellingProducts-container mt-3">
                <div className="category-container">
                    <Link to='/'>All</Link>
                    <Link to='LiveStockAndPoultry'>LiveStock And Poultry Products</Link>
                    <Link to='FishandSeaShells'>Fish and SeaShells</Link>
                    <Link to='UpAndLowLandVege'>Up And Low Land Vegetables</Link>
                    <Link to='Fruits'>Fruits</Link>
                    <Link to='Rice'>Rice</Link>
                    <Link to='HerbsAndSpices'>Herbs and Spices</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default BestSellingProduct