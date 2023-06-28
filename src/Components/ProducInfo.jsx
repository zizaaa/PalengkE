import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { FaFacebookMessenger, FaUserEdit } from 'react-icons/fa';
import { HiShoppingCart,HiOutlineTicket } from 'react-icons/hi'
import { BsArrowLeftShort, BsFacebook, BsInstagram,BsTwitter } from 'react-icons/bs'
import { MdLocationPin, MdOutlineDeleteOutline  } from 'react-icons/md'
import { AiFillStar,AiOutlineStar } from 'react-icons/ai' 
import { FetchProduct } from "../FetchProduct";
import { FetchUsers } from "../FetchUsers";
import logo from '../assets/logo.png'
import logo_2 from '../assets/logo2.png'
import logoWhite from '../assets/logo_white.png'
import profile from '../assets/profileDark.png'
import Skeleton from '../Components/skeletonLoading/ProductInfoSkeleton'
import CartSkeleton from "./skeletonLoading/CartSkeleton";
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL

const ProducInfo = () => {
  const {isProductLoading} = FetchProduct()
  const { authorizedUser,authorizedId } = FetchUsers()
  const data = ('session',JSON.parse(sessionStorage.getItem('data')))
  
  const navigate = useNavigate();
  const { id } = useParams();

  const product = data.find(product => product._id === id)
  const [isLoading, setIsLoading] = useState(false)
  const [toLoading,setToLoading] = useState('');
  const [isUserLoading,setIsUserLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(product.img[0].imgOne);
  const maxRating = 5;

  //share url
    const shareUrl = window.location.href;
    const shareTitle = `${product.name}`;
    const handleMessengerShare = () => {
      const encodedUrl = encodeURIComponent(shareUrl);
      const messengerUrl = `fb-messenger://share/?link=${encodedUrl}`;
  
      window.open(messengerUrl, '_blank');
    };


    let choosenProducts = {};

    const addToCart= async(e)=>{
        if(authorizedUser.userName != undefined){
            const currentCart = authorizedUser.cart
            const currentUserId = authorizedUser._id
            const productId = e.target.parentElement.parentElement.id
            setToLoading(productId)
            setIsLoading(true)

            data.filter((product)=> productId === product._id ? choosenProducts = product:null)

            if(currentCart != ''){
                let bool = false;
                const newCart = currentCart.map((item)=>{
                    if(item.id === choosenProducts._id){
                        const updatedItem = {
                            ...item,
                            item:1 + item.item,
                            newPrice:item.sale ? item.origPrice * (item.item + 1) :'',
                            price:item.sale ? '':item.origPrice * (item.item + 1)
                        }
                        bool = true
                        return updatedItem
                    }
                    return item;
                })

                if(bool){
                        try{
                            const addToCartProducts = {
                            cart:newCart
                            }
                            await axios.put(`${URL}/user/${currentUserId}`,addToCartProducts)
                            setIsLoading(false)
                        }catch(error){
                            alert(error)
                        }
                        bool=false
                }else{

                        try{
                            const addToCartProducts = {
                            cart:[...currentCart,{
                                id:choosenProducts._id,
                                name:choosenProducts.name,
                                newPrice:choosenProducts.newPrice,
                                salePercentage:choosenProducts.salePercentage,
                                price:choosenProducts.price,
                                origPrice: choosenProducts.sale ?choosenProducts.newPrice:choosenProducts.price,
                                quantity:choosenProducts.quantity,
                                bestSeller:choosenProducts.bestSeller,
                                sale:choosenProducts.sale,
                                category:choosenProducts.category,
                                img:choosenProducts.img,
                                usersProductReviews:choosenProducts.usersProductReviews,
                                productSold:choosenProducts.productSold,
                                description:choosenProducts.description,
                                checked:false,
                                item:1,
                            }]
                            }
                            await axios.put(`${URL}/user/${currentUserId}`,addToCartProducts)
                            setIsLoading(false)
                        }catch(error){
                            alert(error)
                        }
                }
            }else{
                    try{
                        const addToCartProducts = {
                        cart:[...currentCart,{
                            id:choosenProducts._id,
                            name:choosenProducts.name,
                            newPrice:choosenProducts.newPrice,
                            salePercentage:choosenProducts.salePercentage,
                            price:choosenProducts.price,
                            origPrice: choosenProducts.sale ?choosenProducts.newPrice:choosenProducts.price,
                            quantity:choosenProducts.quantity,
                            bestSeller:choosenProducts.bestSeller,
                            sale:choosenProducts.sale,
                            category:choosenProducts.category,
                            img:choosenProducts.img,
                            usersProductReviews:choosenProducts.usersProductReviews,
                            productSold:choosenProducts.productSold,
                            description:choosenProducts.description,
                            checked:false,
                            item:1,
                        }]
                        }
                        await axios.put(`${URL}/user/${currentUserId}`,addToCartProducts)
                        setIsLoading(false)
                    }catch(error){
                        alert(error)
                    }
            }

        }else{
            navigate('/forms/login')
        }
    }

  const computeStarRatings = (totalRatings) => {
    const averageRating = calculateAverageRating(totalRatings);
    const roundedRating = Math.round(averageRating * 10) / 10; // Round to one decimal place
    const cappedRating = Math.min(roundedRating, 5); // Cap the rating to a maximum of 5
  
    return cappedRating;
  };
  
  const calculateAverageRating = (totalRatings) => {
    const sumRatings = totalRatings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = sumRatings / totalRatings.length;
  
    return averageRating;
  };

  const ratings = product.usersProductReviews.map((data) => data.stars);
  const cappedRating = computeStarRatings(ratings);
  const filledStars = Math.floor(cappedRating);
  const decimalPart = cappedRating - filledStars;
  const starCounter = decimalPart > 0 ? `${cappedRating.toFixed(1)}` : `${filledStars}.0`;
  
  const checkedProducts = async (e)=>{
    const currentCart = authorizedUser.cart
    const productId = e.target.id

        let productUpdated = false;
        const checkedProduct = currentCart.map((product)=>{
            if(product.id === productId){
                const editedroduct = product.checked ? {...product,checked:false}:{...product,checked:true}
                
                productUpdated = true;
                return editedroduct
            }
            return product
        })

        if(productUpdated){
            try{
                const addToCartProducts = {
                    cart:checkedProduct
                }
                await axios.put(`${URL}/user/${authorizedId}`,addToCartProducts)
            }catch(error){
                alert(error)
            }
                productUpdated=false
        }
}

const [isAllSelected,setIsAllSelected] = useState(false)
const selectAll = async()=>{
    const currentCart = authorizedUser.cart
    setIsAllSelected(true)
        const checkedProduct = currentCart.map((product)=>{
                const editedroduct = {...product,checked:true}
                return editedroduct
        })
            try{
                const addToCartProducts = {
                    cart:checkedProduct
                }
                await axios.put(`${URL}/user/${authorizedId}`,addToCartProducts)
            }catch(error){
                alert(error)
            }
}
const unSelectAll = async()=>{
    const currentCart = authorizedUser.cart
    setIsAllSelected(false)

        const checkedProduct = currentCart.map((product)=>{
                const editedroduct = {...product,checked:false}
                return editedroduct
        })
            try{
                const addToCartProducts = {
                    cart:checkedProduct
                }
                await axios.put(`${URL}/user/${authorizedId}`,addToCartProducts)
            }catch(error){
                alert(error)
            }
}

const deleteSelected = async()=>{
    let selectedCount = 0;
    const currentCart = authorizedUser.cart

    setIsAllSelected(false)
    currentCart.forEach((selectedItem)=>{
        if(selectedItem.checked){
            selectedCount += 1
        }
    })
    
    if(selectedCount >= 1 ){
        const updatedCart = currentCart.filter((product)=> product.checked !== true)
            try{
                const addToCartProducts = {
                    cart:updatedCart
                }
                await axios.put(`${URL}/user/${authorizedId}`,addToCartProducts)
            }catch(error){
                alert(error)
            }
    }
}

const deleteSingleItem = async(e)=>{
    const toDeleteId = e.target.id
    const currentCart = authorizedUser.cart
    
        const updatedCart = currentCart.filter((product)=> product.id !== toDeleteId)
        try{
            const addToCartProducts = {
                cart:updatedCart
            }
            await axios.put(`${URL}/user/${authorizedId}`,addToCartProducts)
        }catch(error){
            alert(error)
        }
}

const [errorMessage, setErrorMessage] = useState('');
const [isCheckOut,setIsCheckOut] = useState(false)
const [voucher, setVoucher] = useState('')
const checkOut =()=>{
    let selectedCount = 0;
    const currentCart = authorizedUser.cart
    //checked
    currentCart.forEach((selectedItem)=>{
        if(selectedItem.checked){
            selectedCount += 1
        }
    })

    if(selectedCount <= 0){
        setErrorMessage('Please select product to check out!')
    }else{
        setErrorMessage('')
        setIsCheckOut(true)
    }
}

const increaseItem=async(e)=>{
    const currentCart = authorizedUser.cart
    const productId = e.target.parentElement.id

        
        const increaseItem = currentCart.map((item)=>{
            if(item.id === productId){
                const editedroduct = {
                    ...item,
                    item:item.item + 1,
                    newPrice:item.sale ? item.origPrice * (item.item + 1) :'',
                    price:item.sale ? '':item.origPrice * (item.item + 1)
                }
                
                return editedroduct
            }
            return item
        })

            try{
                const addToCartProducts = {
                    cart:increaseItem
                }
                await axios.put(`${URL}/user/${authorizedId}`,addToCartProducts)
            }catch(error){
                alert(error)
            }
   } 

   const decreaseItem =async(e)=>{
    const currentCart = authorizedUser.cart
    const productId = e.target.parentElement.id
        
        const decreaseItem = currentCart.map((item)=>{
            if(item.id === productId){
                const editedroduct = {
                    ...item,
                    item:item.item > 1 ? item.item - 1:1,
                    newPrice:item.sale ? item.item <= 1 ? item.origPrice:item.newPrice - item.origPrice :'',
                    price:item.sale ? '':item.item <= 1 ? item.origPrice:item.price - item.origPrice
                }
                
                return editedroduct
            }
            return item
        })

            try{
                const addToCartProducts = {
                    cart:decreaseItem
                }
                await axios.put(`${URL}/user/${authorizedId}`,addToCartProducts)
            }catch(error){
                alert(error)
            }
   } 

  const buyNow = async(e)=>{
    if(authorizedUser.userName != undefined){
      const currentCart = authorizedUser.cart
      const currentUserId = authorizedUser._id
      const productId = e.target.id

      data.filter((product)=> productId === product._id ? choosenProducts = product:null)

      if(currentCart != ''){
          let bool = false;
          const newCart = currentCart.map((item)=>{
              if(item.id === choosenProducts._id){
                  const updatedItem = {
                    ...item,
                    item:1 + item.item,
                    checked:true,
                    newPrice:item.sale ? item.origPrice * (item.item + 1) :'',
                    price:item.sale ? '':item.origPrice * (item.item + 1)
                }
                  bool = true
                  return updatedItem
              }
              return item;
          })

          if(bool){
                  try{
                      const addToCartProducts = {
                      cart:newCart
                      }
                      await axios.put(`${URL}/user/${currentUserId}`,addToCartProducts)
                      setIsLoading(false)
                      setIsCheckOut(true)
                  }catch(error){
                      alert(error)
                  }
                  bool=false
          }else{

                  try{
                      const addToCartProducts = {
                      cart:[...currentCart,{
                          id:choosenProducts._id,
                          name:choosenProducts.name,
                          newPrice:choosenProducts.newPrice,
                          salePercentage:choosenProducts.salePercentage,
                          price:choosenProducts.price,
                          origPrice: choosenProducts.sale ?choosenProducts.newPrice:choosenProducts.price,
                          quantity:choosenProducts.quantity,
                          bestSeller:choosenProducts.bestSeller,
                          sale:choosenProducts.sale,
                          category:choosenProducts.category,
                          img:choosenProducts.img,
                          usersProductReviews:choosenProducts.usersProductReviews,
                          productSold:choosenProducts.productSold,
                          description:choosenProducts.description,
                          checked:true,
                          item:1,
                      }]
                      }
                      await axios.put(`${URL}/user/${currentUserId}`,addToCartProducts)
                      setIsLoading(false)
                      setIsCheckOut(true)
                  }catch(error){
                      alert(error)
                  }
          }
      }else{
              try{
                  const addToCartProducts = {
                  cart:[...currentCart,{
                      id:choosenProducts._id,
                      name:choosenProducts.name,
                      newPrice:choosenProducts.newPrice,
                      salePercentage:choosenProducts.salePercentage,
                      price:choosenProducts.price,
                      origPrice: choosenProducts.sale ?choosenProducts.newPrice:choosenProducts.price,
                      quantity:choosenProducts.quantity,
                      bestSeller:choosenProducts.bestSeller,
                      sale:choosenProducts.sale,
                      category:choosenProducts.category,
                      img:choosenProducts.img,
                      usersProductReviews:choosenProducts.usersProductReviews,
                      productSold:choosenProducts.productSold,
                      description:choosenProducts.description,
                      checked:true,
                      item:1,
                  }]
                  }
                  await axios.put(`${URL}/user/${currentUserId}`,addToCartProducts)
                  setIsLoading(false)
                  setIsCheckOut(true)
              }catch(error){
                  alert(error)
              }
      }

  }else{
      navigate('/forms/login')
  }
  }

// checked item total price
let totalPrice = 0;
const totalPriceFunc =()=>{
    const currentCart = authorizedUser.cart
    if(currentCart != undefined){
        currentCart.forEach(item => {
            if(item.checked){
                if (item.sale) {
                    totalPrice += item.newPrice
                } else {
                    totalPrice += item.price;
                }
            }
        });
    }
}
totalPriceFunc();
  useEffect(()=>{
    if(sessionStorage.getItem('userId') != null){
        if(authorizedUser.userName === undefined){
            setIsUserLoading(true)
        }else{
            setIsUserLoading(false)
        }
    }else{
        setIsUserLoading(false)
    }
  },[authorizedUser])

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
                    {authorizedUser.cart != undefined ? authorizedUser.cart.length <=0 ?'':(
                      <span className='cart-product-counter'>{authorizedUser.cart.length}</span>
                    ):''}
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
                        <button type="button" className="center-btn" onClick={()=>{setImgSrc(product.img[0].imgTwo)}}>
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
                            <p className='star-counter m-0'>
                              {starCounter}
                            </p>
                            {[...Array(maxRating)].map((_, starIndex) => (
                                <p
                                  key={starIndex}
                                  className={starIndex < filledStars ? 'star-filled' : 'star'}
                                >
                                  {starIndex < filledStars ? <AiFillStar /> : <AiOutlineStar />}
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
                        <div className={isLoading || isUserLoading ? 'custom-spinner-loading':'custom-spinner'} id={product._id}>
                            <div className={`${isLoading && toLoading === product._id || isUserLoading ? 'spinner-border':''}`} role="status">
                            <button className={`${isLoading && toLoading === product._id || isUserLoading ? 'visually-hidden':''}`} onClick={addToCart} type='button' id={product._id}>
                          <span><HiShoppingCart/></span>
                          Add to cart</button>
                            </div>
                        </div>
                          <button type='button' id={product._id} onClick={(e)=>{buyNow(e)}} data-bs-toggle="offcanvas" data-bs-target="#cartSideNav" aria-controls="offcanvasRight">Buy Now</button>
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
                        {review.img !== undefined ? <img src={`${URL}/${review.img}`}/>:<img src={profile}/>}
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
            <div className="offcanvas offcanvas-end custom-sidenav-cart" data-bs-backdrop="false" tabIndex="-1" id="cartSideNav" aria-labelledby="offcanvasScrollingLabel">
            <div className={`offcanvas-header custom-sidenav-cart-header ${isCheckOut ? 'hide-cart':''}`}>
                <div className='header-container' id="offcanvasRightLabel">
                    {/* <HiShoppingCart/> */}
                        <div className='logo-container'>
                            <img src={logoWhite} className='img-fluid'/>
                        </div>
                        <button type="button" onClick={unSelectAll} className="cart-back-btn" data-bs-dismiss="offcanvas" aria-label="Close">
                            <BsArrowLeftShort className='cart-back-icon'/>
                        </button>
                        <button type="button" className="cart-edit-btn"  id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Edit items
                        </button>
                        {/* dropdown */}
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {isAllSelected ? 
                                <li><button onClick={unSelectAll} className="dropdown-item">Unselect all</button></li>
                            :
                                <li><button onClick={selectAll} className="dropdown-item">Select all</button></li>
                            }
                                <li><button onClick={deleteSelected} className="dropdown-item">Delete all selected</button></li>
                        </ul>
                </div>
            </div>
            <div className={` offcanvas-body cart-items-container ${isCheckOut ? 'hide-cart':''}`}>
                { isUserLoading ? (<CartSkeleton/>)
                    
                    :authorizedUser.cart ? (
                        authorizedUser.cart.map((cart,index)=>(
                        <div className='cart-product-main-container' key={index}>
                            <input id={cart.id} checked={cart.checked} type='checkbox' onChange={(e)=>{checkedProducts(e)}} className='checkBox'/>
                            <div className='cart-product'>
                                <div className='cart-img-container'>
                                    <img src={cart.img[0].imgOne} className='img-fluid'/>
                                </div>
                                <div className='cart-product-info'>
                                    <h4 className='cart-product-name'>
                                        {cart.name}
                                    </h4>
                                    <h5 className='cart-product-price'>
                                        <span>&#8369;</span>
                                        {cart.sale ? cart.newPrice:cart.price}
                                    </h5>
                                    <div className='cart-product-quantity-container'>
                                        <p className='cart-product-quantity'>
                                            Quantity:
                                        </p>
                                        <div className='cart-product-quantity-setter-container' id={cart.id}>
                                            <button type='button' onClick={(e)=>{decreaseItem(e)}}>-</button>
                                            <span className='quantity-count'>{cart.item}</span>
                                            <button type='button' onClick={(e)=>{increaseItem(e)}}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className='trash-container'>
                                <button type='button' id={cart.id} onClick={(e)=>{deleteSingleItem(e)}}>
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
                                    <h5>Voucher:</h5>
                                </div>
                                <div className="voucher-input">
                                    <div className="dropdown custom-dropdown">
                                        <button className='dropdown-btn' type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            {voucher ? voucher.name:'Select Voucher'}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            {authorizedUser.vouchers != undefined ? authorizedUser.vouchers != '' ? 
                                            
                                            authorizedUser.vouchers.map((voucher)=>(
                                                voucher.expired === 'true' || voucher.used === 'true' ? '':
                                                    <li key={voucher.name}>
                                                        <button onClick={()=>{setVoucher(voucher)}} className="dropdown-item">
                                                            {voucher.name}
                                                            {` - ${voucher.salePercentage}% off`}
                                                        </button>
                                                    </li>
                                            ))

                                            :
                                                <li>
                                                    <p className="no-voucher-message">You don't have vouchers</p>
                                                </li>
                                            :''}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='checkOut-container'>
                            <button type='button' onClick={checkOut}>Check Out</button>
                            <p className="checkout-error-message">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                </div>

                {/* checkOut */}
                <div className={`${isCheckOut ? 'check-out-container':'hide-checkOut'}`}>
                    <div className="checkout-header">
                        <h3>Check Out</h3>
                        <div className='logo-container'>
                            <img src={logoWhite} className='img-fluid'/>
                        </div>
                        <button type="button" onClick={()=>{setIsCheckOut(false)}} className="checkout-back-btn">
                            <BsArrowLeftShort className='checkout-back-icon'/>
                        </button>
                    </div>
                    <div className="delivery-address">
                        <div className="top-container">
                            <div className="location-icon-container">
                                <MdLocationPin/>
                                <p>Delivery Address</p>
                            </div>
                            <div className="edit-location-container">
                                <button type='button'><FaUserEdit/></button>
                            </div>
                        </div>
                        <div className="user-location-container">
                            <div className="user-location-info">
                                <span className="user-name-phone">
                                    <p className="user-name">
                                        {`${authorizedUser.firstName}  ${authorizedUser.lastName}`}
                                    </p>
                                    <span className="divider">|</span>
                                    <p className="user-phone">
                                    {authorizedUser.number}
                                    </p>
                                </span>
                                <p className="user-add">{authorizedUser.address}</p>
                            </div>
                        </div>
                    </div>
                    <div className="checked-out-Products-container">
                            {authorizedUser.cart !== undefined ? authorizedUser.cart.map((product,index)=>(
                                product.checked ? 
                                <div className="order-products" key={index}>
                                    <div className="product-img-container">
                                        <img src={product.img[0].imgOne}/>
                                    </div>
                                    <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <span className="price-quantity">
                                            <p>&#8369;{product.sale ? product.newPrice:product.price}</p>
                                            <p>{product.item}x</p>
                                        </span>
                                    </div>
                                </div>
                                :''
                            )):''}
                    </div>
                    <div className="place-order-container">
                        <div className="total-payments-container">
                            <p>Total payment</p>
                            {voucher ? <p className="voucher-percent">{`-${voucher.salePercentage}%`}</p>:''}
                            <p>&#8369;{voucher ? Math.floor(totalPrice - (totalPrice * (voucher.salePercentage / 100))).toLocaleString():totalPrice}</p>
                        </div>
                        <div className="placeorder-btn-container">
                            <button className={voucher ? 'place-order-w-voucher':'place-order'}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
    <footer className=" py-5">
            <div className="container">
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
                        <h4>Website </h4>
                            <div className="footerLinks">
                                <Link to='/policies' className="footer-link">Privacy Policy</Link>
                                <Link to='/policies' className="footer-link">Terms and Conditions</Link>
                                <Link to='/policies' className="footer-link">Shipping and Delivery</Link>
                                <Link to='/policies' className="footer-link">Returns and Refunds</Link>
                                <Link to='/policies' className="footer-link">Payment Methods</Link>
                                <Link to='/policies' className="footer-link">Product Descriptions</Link>
                                <Link to='/policies' className="footer-link">Intellectual Property</Link>
                                <Link to='/policies' className="footer-link">Customer Support</Link>
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