import { FaChevronRight,FaChevronLeft } from 'react-icons/fa'

const HerbsAndSpices = () => {
  return (
    <section className="allcategory-section">
    <div className="AllCategory-container">
        <div className="row-custom">
            {/* next and prev button */}
            <button type='button' className='left-button'>
                <FaChevronLeft/>
            </button>
            <button type='button' className='right-button'>
                <FaChevronRight/>
            </button>
            {/* cards of products */}
            <div className="custom-card">
                <div className="img-container">
                  <img src="https://www.jayanti.com/wp-content/uploads/2018/01/herbs-spice.jpg"/>
                </div>
                <div className="product-info">
                  <h4 className="productName">Tomatoe</h4>
                  <p className="producPrice">&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                    <img src="https://foodandnutrition.org/wp-content/uploads/herbs-spices-941858854-780x520.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://img2.10bestmedia.com/Images/Photos/379581/GettyImages-477756915_55_660x440.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://i.pinimg.com/236x/ea/5a/b5/ea5ab57d9943093d9c8fa5e8cab5c7d0.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://www.foodqualityandsafety.com/wp-content/uploads/2020/10/738786195-1024x683.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default HerbsAndSpices