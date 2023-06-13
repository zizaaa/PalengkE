import { FaChevronRight,FaChevronLeft } from 'react-icons/fa'

const AllCategory = () => {
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
                      <img src="https://post.healthline.com/wp-content/uploads/2020/08/AN534-Tomatoes-Hands-732x549-thumb.jpg"/>
                    </div>
                    <div className="product-info">
                      <h4 className="productName">Tomatoe</h4>
                      <p className="producPrice">&#8369; 85.00</p>
                      <button type="button">Add to cart</button>
                    </div>
                </div>
                <div className="custom-card">
                    <div className="img-container">
                          <img src="https://post.healthline.com/wp-content/uploads/2020/08/AN534-Tomatoes-Hands-732x549-thumb.jpg"/>
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

export default AllCategory