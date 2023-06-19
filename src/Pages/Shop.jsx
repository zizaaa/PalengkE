import { Link, Outlet, useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();

  const scrollDown=(e)=>{
      //navigate path
      navigate(`${e.target.id}`)

      // Find the element you want to scroll to
      var targetElement = document.getElementById('products'); // Replace 'targetElementId' with the actual ID of your target element

      // Scroll to the target element
      targetElement.scrollIntoView({ behavior: 'smooth' });

  }
  return (
    <section className="bg-light">
      <div className="shop-hero">
        <div className="first-flex-container">
          <div className=" shop-hero-div">
            <div className="content-container one">
              <div className="content">
                <h1>Livestock & Poultry Products</h1>
                <button id='liveStockAndPoultryProducts' onClick={scrollDown} className="shop-btn">Shop</button>
              </div>
              <span className="dark-bg"></span>
            </div>
          </div>
          <div className=" shop-hero-div">
            <div className="content-container two">
              <div className="content">
                <h1>Fish & SeaShells</h1>
                <button id='fishAndSeaShells' onClick={scrollDown} className="shop-btn">Shop</button>
              </div>
              <span className="dark-bg"></span>
            </div>
          </div>
          <div className=" shop-hero-div">
            <div className="content-container three">
            <div className="content">
              <h1>Vegetables</h1>
              <button id='upAndLowLandVegetables' onClick={scrollDown} className="shop-btn">Shop</button>
            </div>
              <span className="dark-bg"></span>
            </div>
          </div>
        </div>
        <div className="second-flex-container">
          <div className=" shop-hero-div">
              <div className="content-container four">
                <div className="content">
                  <h1>Fruits</h1>
                  <button id='fruits' onClick={scrollDown} className="shop-btn">Shop</button>
                </div>
                <span className="dark-bg"></span>
              </div>
          </div>
            <div className=" shop-hero-div">
              <div className="content-container five">
                <div className="content">
                  <h1>Herbs & Spices</h1>
                  <button id='herbsAndSpices' onClick={scrollDown} className="shop-btn">Shop</button>
                </div>
                <span className="dark-bg"></span>
              </div>
            </div>
            <div className=" shop-hero-div">
              <div className="content-container six">
                <div className="content">
                  <h1>Rice</h1>
                  <button id='rice' onClick={scrollDown} className="shop-btn">Shop</button>
                </div>
                <span className="dark-bg"></span>
              </div>
            </div>
        </div>
      </div>
      <div className="container mt-5">
        <h1 className="ourProducts">Our Products</h1>
        <div className="shop-categories" id='products'>
          <h6 className="shop-category-btn">Categories:</h6>
          <Link to='' className="shop-category-btn">All</Link>
          <Link to='liveStockAndPoultryProducts' className="shop-category-btn">LiveStock and Poultry Products</Link>
          <Link to='fishAndSeaShells' className="shop-category-btn">Fish and SeaShells</Link>
          <Link to='upAndLowLandVegetables' className="shop-category-btn">Up And Low Land Vegetables</Link>
          <Link to='fruits' className="shop-category-btn">Fruits</Link>
          <Link to='rice' className="shop-category-btn">Rice</Link>
          <Link to='herbsAndSpices' className="shop-category-btn">Herbs and Spices</Link>
        </div>
        <div className="shop-products-container">
            <Outlet/>
        </div>
      </div>
    </section>
  )
}

export default Shop