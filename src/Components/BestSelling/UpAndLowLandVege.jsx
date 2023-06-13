import { FaChevronRight,FaChevronLeft } from 'react-icons/fa'
const UpAndLowLandVege = () => {
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
                  <img src="https://media.philstar.com/photos/2021/01/23/vegatable_2021-01-23_21-54-58.jpg"/>
                </div>
                <div className="product-info">
                  <h4 className="productName">Tomatoe</h4>
                  <p className="producPrice">&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                    <img src="https://baguioheraldexpressonline.com/wp-content/uploads/2017/03/vegetables-640x360.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://media.philstar.com/photos/2019/02/23/agri2-vegetables-root-crops_2019-02-23_19-20-56.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://www.bizzbuzz.news/h-upload/2022/04/17/1518051-fff.jpg"/>
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

export default UpAndLowLandVege