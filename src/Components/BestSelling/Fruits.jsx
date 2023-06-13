import { FaChevronRight,FaChevronLeft } from 'react-icons/fa'

const Fruits = () => {
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
                  <img src="https://images.squarespace-cdn.com/content/v1/5b35b18af93fd4d75e591f4a/1543985705633-PCFJHY4L8CTTOR4NSRW9/HS-Website---Fruit-Products.jpg?format=2500w"/>
                </div>
                <div className="product-info">
                  <h4 className="productName">Tomatoe</h4>
                  <p className="producPrice">&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                    <img src="https://anotheronebitesthecrustblog.com/wp-content/uploads/2017/05/fruits.jpg"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://images.squarespace-cdn.com/content/v1/5a3586f70abd0420bf56d644/1514348140914-8KBL32TYYYFQUB4EIDS6/bigstock-Fresh-mixed-fruit-superfood-ba-114411437.jpg?format=1000w"/>
                </div>
                <div className="product-info">
                  <h4>Tomatoe</h4>
                  <p>&#8369; 85.00</p>
                  <button type="button">Add to cart</button>
                </div>
            </div>
            <div className="custom-card">
                <div className="img-container">
                      <img src="https://globalhealth.washington.edu/sites/default/files/styles/blog_post/public/eating-fruit-and-vegetables2.jpg?itok=K307tlAf"/>
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

export default Fruits