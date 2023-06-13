import { FaChevronRight,FaChevronLeft } from 'react-icons/fa'
const LiveStockAndPoultry = () => {
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
                      <img src="https://thenassauguardian.com/wp-content/uploads/2021/03/EGGS.jpg"/>
                    </div>
                    <div className="product-info">
                      <h4 className="productName">Tomatoe</h4>
                      <p className="producPrice">&#8369; 85.00</p>
                      <button type="button">Add to cart</button>
                    </div>
                </div>
                <div className="custom-card">
                    <div className="img-container">
                        <img src="https://i0.wp.com/southeastagnet.com/wp-content/uploads/2016/08/raw-meat.jpg?fit=1000%2C667&ssl=1&resize=350%2C200"/>
                    </div>
                    <div className="product-info">
                      <h4>Tomatoe</h4>
                      <p>&#8369; 85.00</p>
                      <button type="button">Add to cart</button>
                    </div>
                </div>
                <div className="custom-card">
                    <div className="img-container">
                          <img src="https://financialtribune.com/sites/default/files/styles/360x260/public/field/image/17january/04-zs-livestock_poultry_139-ab.jpg?itok=tF1ZpmaG"/>
                    </div>
                    <div className="product-info">
                      <h4>Tomatoe</h4>
                      <p>&#8369; 85.00</p>
                      <button type="button">Add to cart</button>
                    </div>
                </div>
                <div className="custom-card">
                    <div className="img-container">
                          <img src="https://www.provisioneronline.com/ext/resources/Issues/2018/December/1218NP_economicoutlook_img1.jpg?1544825511"/>
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

export default LiveStockAndPoultry