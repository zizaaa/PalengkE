import { Link } from "react-router-dom"
import { AiOutlineSwapRight } from 'react-icons/ai'

const Category = () => {
  return (
    <section className="category-section my-5">
        <div className="container category-container">
            <div className="row align-items-center">
                <div className="col-md">
                    <div className="LiveStock-category">
                        <div className="content">
                            <h3>Live Stock & Poultry Products</h3>
                            <p>Your Premier Destination for Online Shopping of Premium Live Stock & Poultry Products, Where Quality Meets Convenience at Your Fingertips.</p>
                            <Link to='' className="content-btn">Shop <span className="arrow-icon"><AiOutlineSwapRight/></span></Link>
                        </div>
                    </div>
                </div>
                <div className="col-md">
                    <div className="col-md">
                        <div className="FishAndSeaShells-category">
                            <div className="content">
                                <h3>Fish and SeaShells</h3>
                                <p> Embark on a Marine Delight Adventure with our Finest Selection of Fresh Fish and Exquisite SeaShells, Bringing the Ocean's Bounty Straight to Your Doorstep.</p>
                                <Link to='' className="content-btn">Shop <span className="arrow-icon"><AiOutlineSwapRight/></span></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md mt-3">
                        <div className="UpAndLowLandVege-category">
                            <div className="content">
                                <h3>Up and LowLand Vegetables</h3>
                                <p>Explore the Bountiful Harvests of the Up and Lowlands with our Pristine Selection of Fresh and Nutritious Vegetables, Savoring the Essence of Nature's Green Delights.</p>
                                <Link to='' className="content-btn">Shop <span className="arrow-icon"><AiOutlineSwapRight/></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Category