import { FaChevronRight,FaChevronLeft } from 'react-icons/fa'

const FishandSeaShells = () => {
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
                  <img src="https://www.shutterstock.com/image-photo/seafood-fish-octopus-shrimp-oysters-260nw-1007402578.jpg"/>
                </div>
                <div className="product-info">
                  <h4 className="productName">Tomatoe</h4>
                  <p className="producPrice">&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                    <img src="https://pro-seafood.ru/wp-content/uploads/2018/07/stavrida-obyknovennaya.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Stavrida.jpg/220px-Stavrida.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://thumbs.dreamstime.com/b/fish-fish-market-116258228.jpg"/>
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

export default FishandSeaShells