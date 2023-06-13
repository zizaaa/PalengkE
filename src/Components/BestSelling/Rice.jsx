import { FaChevronRight,FaChevronLeft } from 'react-icons/fa'
const Rice = () => {
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
                  <img src="https://sciencemeetsfood.org/wp-content/uploads/2017/09/rice-featured-image.jpg"/>
                </div>
                <div className="product-info">
                  <h4 className="productName">Tomatoe</h4>
                  <p className="producPrice">&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                    <img src="https://www.heart.org/-/media/Images/News/2022/March-2022/0329EIOLIRice_SC.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://i.guim.co.uk/img/media/8042f5e3592ca576bb62b4547f5ef4a606245bc9/447_0_4722_2833/master/4722.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=7f501739ad4943ac09bf20afdd6f7791"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://www.jessicagavin.com/wp-content/uploads/2020/03/types-of-rice.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://www.philrice.gov.ph/wp-content/uploads/2018/08/Pigmented-rice-1.jpg"/>
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

export default Rice