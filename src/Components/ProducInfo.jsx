import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from 'react';
import { FaFacebookMessenger } from 'react-icons/fa';
import { HiShoppingCart,HiOutlineTicket } from 'react-icons/hi'
import { BsArrowLeftShort, BsFacebook, BsInstagram,BsTwitter } from 'react-icons/bs'
import { MdOutlineDeleteOutline  } from 'react-icons/md'
import { AiFillStar,AiOutlineStar } from 'react-icons/ai' 
import { FetchProduct } from "../FetchProduct";
import { FetchUsers } from "../FetchUsers";
import logo from '../assets/logo.png'
import logo_2 from '../assets/logo2.png'
import logoWhite from '../assets/logo_white.png'
import profile from '../assets/profileDark.png'
import Skeleton from '../Components/skeletonLoading/ProductInfoSkeleton'
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL

const ProducInfo = () => {
  const {isProductLoading} = FetchProduct()
  const { authorizedUser } = FetchUsers()
  const data = ('session',JSON.parse(sessionStorage.getItem('data')))
  
  const navigate = useNavigate();
  const { id } = useParams();

  const product = data.find(product => product._id === id)
  const [isLoading, setIsLoading] = useState(false)
  const [toLoading,setToLoading] = useState('');
  const [imgSrc, setImgSrc] = useState(product.img[0].imgOne);
  const maxRating = 5;

  //share url
    const shareUrl = `${window.location.href}/${id}`;
    const shareTitle = `${product.name}`;
    const handleMessengerShare = () => {
      const encodedUrl = encodeURIComponent(shareUrl);
      const messengerUrl = `fb-messenger://share/?link=${encodedUrl}`;
  
      window.open(messengerUrl, '_blank');
    };


    const choosenProducts = []

    const addToCart= async(e)=>{
        if(authorizedUser.userName != undefined){
            const currentCart = authorizedUser.cart
            const currentUserId = authorizedUser._id
            const productId = e.target.id
            setToLoading(productId)
            setIsLoading(true)

            await data.filter((product)=> productId === product._id ? choosenProducts.push(product):null)
            try{
                    const addToCartProducts = {
                    cart:[...currentCart,choosenProducts]
                    }
                    await axios.put(`${URL}/user/${currentUserId}`,addToCartProducts)
                    setIsLoading(false)
            }catch(error){
                    alert(error)
            }
        }else{
            navigate('/forms/login')
        }
    }

  return (
<>
  <section>
        <div className='product-info-nav'>
            <div className='container product-info-nav-container'>
              <div className='left-side'>
                  <Link to='/' className='img-container'>
                    <img src={logo}/>
                  </Link>
              </div>
              <div className='right-side'>
                  {authorizedUser.userName != undefined ? (
                    <>
                    <button type='button' data-bs-toggle="offcanvas" data-bs-target="#cartSideNav" aria-controls="offcanvasRight">
                      <HiShoppingCart/>
                    </button>
                    <span className='cart-product-counter'>{authorizedUser.cart != undefined ? authorizedUser.cart.length:''}</span>
                    </>
                  ):''}
              </div>
            </div>
        </div>
    {
      isProductLoading ? (
          <Skeleton/>
      ):(
        <>
        <div className='container'>
            <div className='product-info-card'>
                <div className='product-info-img-container'>
                    <div className='displayed-img'>
                        <img src={imgSrc}/>
                    </div>
                    <div className='img-choices'>
                        <button type="button" onClick={()=>{setImgSrc(product.img[0].imgOne)}}>
                            <img src={product.img[0].imgOne} className="img-fluid"/>
                        </button>
                        <button type="button" onClick={()=>{setImgSrc(product.img[0].imgTwo)}}>
                            <img src={product.img[0].imgTwo} className="img-fluid"/>
                        </button>
                        <button type="button" onClick={()=>{setImgSrc(product.img[0].imgThree)}}>
                          <img src={product.img[0].imgThree} className="img-fluid"/>
                        </button>
                    </div>
                    <div className='share-button'>
                      {/* Facebook */}
                      <p>Share:</p>
                        {/* Messenger */}
                      <button onClick={handleMessengerShare}>
                        <FaFacebookMessenger/>
                      </button>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsFacebook/>
                      </a>

                      {/* Instagram */}
                      <a
                        href={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsInstagram/>
                      </a>

                      {/* Twitter */}
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsTwitter/>
                      </a>

                    </div>
                </div>
                <div className='product-info-container'>
                    <h1 className='product-name'>{product.name}</h1>
                    <div className='sold-ratings-container'>
                        <span className="stars-container">
                            <p className='star-counter'>
                              {product.stars ? `${product.stars}.0`:'0'}
                            </p>
                            {[...Array(maxRating)].map((_, starIndex) => (
                                        <p
                                        key={starIndex}
                                        className={starIndex < product.stars ? 'star-filled' : 'star'}
                                        >
                                        {starIndex < product.stars ? <AiFillStar /> : <AiOutlineStar />}
                                        </p>
                            ))}
                        </span>
                        <div className='reviews-solds'>
                            <span className='product-reviews'>
                              <p className='reviews-count'>{product ? product.usersProductReviews.length:'0'}</p>
                              <p className='reviews-name'>Reviews</p>
                            </span>
                            <span className='product-sold'>
                              <p className='sold-count'>{product.productSold}</p>
                              <p className='sold-name'>Sold</p>
                            </span>
                        </div>
                    </div>
                      {/* product price */}
                      <div className='product-price-promo-container'>
                          <p className='sale-prommo'>
                              {product.sale ? `${product.salePercentage}% off`:''}
                          </p>
                          <p className='best-seller-prommo'>
                              {product.bestSeller ? 'Best Seller':''}
                          </p>
                          <span className='price'>
                            {product.sale ? (
                              <>
                                <p className='oldPrice'>&#8369;{product.price}</p>
                                  <span className='divider'>-</span>
                                <p className='newPrice'>&#8369;{product.newPrice} </p>
                                  <span className='quantity'>
                                    / {product.quantity}
                                  </span>
                              </>
                            ):(
                              <>
                                <p className='rice'>&#8369;{product.price}</p>
                                <span className='quantity'>
                                    / {product.quantity}
                                  </span>
                              </>
                            )}
                          </span>
                      </div>
                      {/* product description */}
                      <div className='description-container'>
                        <h5>Description</h5>
                        <p>{product.description}</p>
                      </div>

                      {/* add to cart and buy now btn */}
                      <div className='addToCart-BuyNow-btn'>
                        <div className={isLoading ? 'custom-spinner-loading':'custom-spinner'} id={product._id}>
                            <div className={`${isLoading && toLoading === product._id ? 'spinner-border':''}`} role="status">
                            <button className={`${isLoading && toLoading === product._id ? 'visually-hidden':''}`} onClick={addToCart} type='button' id={product._id}>
                          <span><HiShoppingCart/></span>
                          Add to cart</button>
                            </div>
                        </div>
                          <button type='button'>Buy Now</button>
                      </div>
                </div>
            </div>

            {/*product reviews */}
            <div className='product-reviews my-5'>
                <h2 className="product-reviews-title">Product Reviews</h2>
                <div className="review-cards-container">
                {product.usersProductReviews.map((review,index)=>(
                  <div className="review-cards" key={index}>
                      <div className="img-container">
                          <img src={profile}/>
                      </div>
                      <div className="reviews-content">
                        <div className="head-container">
                          <span className="stars-container">
                            <p className="user-name me-3">{review.name}</p>
                              {[...Array(maxRating)].map((_, starIndex) => (
                                          <p
                                          key={starIndex}
                                          className={starIndex < review.stars ? 'star-filled' : 'star'}
                                          >
                                          {starIndex < review.stars ? <AiFillStar /> : <AiOutlineStar />}
                                          </p>
                              ))}
                          </span>
                          <p className="date">{review.date}</p>
                        </div>
                        <div className="message">
                          <p className="review-title">{review.title}</p>
                          <p>{review.message}</p>
                        </div>
                      </div>
                  </div>
                ))}
                </div>
            </div>
        </div>
        </>
      )
    }
    </section>

            {/* cart sidenav */}
            <div className="offcanvas offcanvas-end custom-sidenav-cart" tabIndex="-1" id="cartSideNav" aria-labelledby="offcanvasRightLabel">
              <div className="offcanvas-header custom-sidenav-cart-header">
                <div className='header-container' id="offcanvasRightLabel">
                    {/* <HiShoppingCart/> */}
                        <div className='logo-container'>
                            <img src={logoWhite} className='img-fluid'/>
                        </div>
                        <button type="button" className="cart-back-btn" data-bs-dismiss="offcanvas" aria-label="Close">
                            <BsArrowLeftShort className='cart-back-icon'/>
                        </button>
                        <button type="button" className="cart-edit-btn">
                            Edit items
                        </button>
                </div>
            </div>
            <div className="offcanvas-body cart-items-container">
                {
                    authorizedUser.cart ? (
                        authorizedUser.cart.map((cart,index)=>(
                        <div className='cart-product-main-container' key={index}>
                            <input type='checkbox' className='checkBox'/>
                            <div className='cart-product'>
                                <div className='cart-img-container'>
                                    <img src={cart[0].img[0].imgOne} className='img-fluid'/>
                                </div>
                                <div className='cart-product-info'>
                                    <h4 className='cart-product-name'>
                                        {cart[0].name}
                                    </h4>
                                    <h5 className='cart-product-price'>
                                        <span>&#8369;</span>
                                        {cart[0].price}
                                    </h5>
                                    <div className='cart-product-quantity-container'>
                                        <p className='cart-product-quantity'>
                                            Quantity:
                                        </p>
                                        <div className='cart-product-quantity-setter-container'>
                                            <button type='button'>-</button>
                                            <span className='quantity-count'>1</span>
                                            <button type='button'>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className='trash-container'>
                                <button type='button'>
                                    <MdOutlineDeleteOutline className='trash-icon'/>
                                </button>
                            </span>
                        </div>
                    ))
                    ):('')
                }
                    <div className='cart-bottom-container'>
                        <div className='voucher-container'>
                            <div className='voucher'>
                                <div className='voucher-title'>
                                    <HiOutlineTicket className='voucher-icon'/>
                                    <h5>Vouncher:</h5>
                                </div>
                                <input type='text' placeholder='Put voucher code here...'/>
                            </div>
                        </div>
                        <div className='checkOut-container'>
                            <button type='button'>Check Out</button>
                        </div>
                    </div>
                </div>
            </div>
    <footer className=" py-5">
            <div className="container">
                
                <div className="footer-input-container mb-5">
                    <form>
                        <input type="email" placeholder="Enter your Email" required/>
                        <button type="submit" className="px-3" name="submitEmail">
                            Get in touch
                        </button>
                    </form>
                </div>

                <div className="row">
                    <div className="col-md">
                        <div className="footer-left-container">
                            <img src={logo_2} className="img-fluid"/>
                            <p>Bringing Nature's Bounty just by a click!</p>
                        </div>
                    </div>
                    <div className="col-md py-3 py-md-0">
                        <div className="footer-center-container">
                            <h4>Socials</h4>
                                <div className="social">
                                    <a href="#">
                                        <BsFacebook/>
                                    </a>
                                    <a href="#">
                                        <BsInstagram/>
                                    </a>
                                    <a href="#">
                                        <FaFacebookMessenger/> 
                                    </a>
                                    <a href="#">
                                        <BsTwitter/>
                                    </a>
                                </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="footer-right-container">
                            <h4>Navigation</h4>
                            <div className="footerLinks">
                                <Link to='#' className="footer-link">Deliver Tommorow</Link>
                                <Link to='#' className="footer-link">All Categories</Link>
                                <Link to='#' className="footer-link">Sale</Link>
                                <Link to='#' className="footer-link">Refund Policy</Link>
                                <Link to='#' className="footer-link">Terms of Service</Link>
                                <Link to='#' className="footer-link">Shipping Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
  </>
  )
}
export default ProducInfo