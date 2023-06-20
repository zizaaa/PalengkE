// import PropTypes from 'prop-types';
import { Outlet,Link } from "react-router-dom"
import { HiShoppingCart,HiMail } from "react-icons/hi"
import { AiOutlineUser,AiOutlineStar,AiTwotonePhone } from "react-icons/ai"
import { HiMenuAlt3,HiOutlineTicket } from "react-icons/hi"
import { BsArrowLeftShort,BsFacebook, BsInstagram,BsTwitter,BsFillCreditCard2BackFill } from "react-icons/bs"
import {FaKey,FaUserEdit, FaFacebookMessenger,FaWallet,FaRegUserCircle, FaUserAlt, FaChevronRight, FaChevronDown} from "react-icons/fa"
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { VscPackage } from 'react-icons/vsc'
import { TbTruckDelivery } from 'react-icons/tb'
import logo from '../assets/logo.png'
import profile from '../assets/profile.png'
import logoWhite from '../assets/logo_white.png'
import logo_2 from '../assets/logo2.png'
import numeral from 'numeral';
import { useState,useEffect } from "react"
import { FetchUsers } from "../FetchUsers"
import CartSkeleton from "./skeletonLoading/CartSkeleton"
import UserProfileSkeleton from "./skeletonLoading/UserProfileSkeleton"

const Layout = () => {
    const { authorizedId,authorizedUser } = FetchUsers()

    const [isDropDown, setIsDropDown] = useState(false);
    const [isFixed, setIsFixed]= useState(false)
    const [userSettingsOn, setUserSettingsOn] = useState(false)
    const [isUserLoading,setIsUserLoading] = useState(true)
    const dropDown=()=>{
        isDropDown ? setIsDropDown(false):setIsDropDown(true)
    }

    useEffect(() => {
        
        window.addEventListener('resize', ()=>{
            if (window.innerWidth >= 993) {
                setIsDropDown(false);
            }
        });
        window.addEventListener('scroll', ()=>{
            if(window.scrollY >= 113){
                setIsFixed(true)
            }else{
                setIsFixed(false)
            }
        });

      }, []); // Remove the empty dependency array if necessary

        useEffect(()=>{
            if(authorizedUser.userName != undefined){
                setIsUserLoading(false)
            }
        },[authorizedUser])
    return (
    <>
        <nav id={isFixed ? 'navBar':'nav'}>
            <div className="container">
                <div className="row custom-row-style">
                    <div className={`col-12 ${isDropDown ? "nav-on-flex-container":"flex-container"}`}>
                        <div className="link-container d-none d-lg-flex">
                          <Link to='/about' className="link about">
                              About Us
                              <span className="hoverLine"></span>
                          </Link>
                            <>|</>
                          <Link to='/shop' type="button" className="link shop">
                              Shop 
                              <span className="hoverLine"></span>
                          </Link>
                            <>|</>
                          <Link to='/contact' className="link contact">
                              Contact Us
                              <span className="hoverLine"></span>
                          </Link>
                        </div>

                        <Link to='/' className="logo-container">
                          <img src={logo} className="img-fluid"/>
                        </Link>

                        {authorizedId != null  ? (                        <div className="user-container d-none d-lg-flex">
                            <button className="cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartSideNav" aria-controls="offcanvasRight">
                                <HiShoppingCart/>
                                    {isUserLoading ? (''):
                                    <span className='cart-overlay-counter'>{authorizedUser.cart ? (authorizedUser.cart.length):(0)}</span>
                                    }
                            </button>
                            <button className="user" data-bs-toggle="offcanvas" data-bs-target="#profileSideNav" aria-controls="offcanvasRight">
                                <AiOutlineUser/>
                            </button>
                        </div>):(
                            <div className="user-container d-none d-lg-flex">
                                <Link to='/forms' className="register-btn">
                                    <h1><AiOutlineUser/></h1>
                                </Link>
                            </div>
                        )}

                        <div className="menu-container d-flex d-lg-none">
                            <button type="button" onClick={dropDown}>
                                <HiMenuAlt3/>
                            </button>
                        </div>
                  </div>

                  {/* dropdown */}
                  <div className={`col-12 dropDown-menu-container ${isDropDown ? "d-block":"d-none"}`}>
                      <div className="dropDown-menu">
                          <Link to='/about' className="link about">
                              About Us
                              <span className="hoverLine"></span>
                          </Link>

                          <Link to='/shop' type="button" className="link shop">
                              Shop 
                          </Link>

                          <Link to='/contact' className="link contact">
                              Contact Us
                              <span className="hoverLine"></span>
                          </Link>

                        {authorizedId != null ? (
                            <div className="dropdown-user-container">
                            {/* total price in cart */}
                            <button className="cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartSideNav" aria-controls="offcanvasRight">
                                <HiShoppingCart/>
                                <p className='ms-2'>
                                    Cart
                                </p>
                            </button>
                            <button className="user" data-bs-toggle="offcanvas" data-bs-target="#profileSideNav" aria-controls="offcanvasRight">
                                <AiOutlineUser/> 
                                    <span className="account-name ms-2">{authorizedUser.firstName ? (authorizedUser.firstName):('')}</span>
                            </button>
                        </div>
                        ):(
                            <div className="dropdown-user-container">
                                <Link to='/forms' className="register-btn">
                                <h1><AiOutlineUser/></h1>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </nav>

        <section>
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
                { isUserLoading ? (<CartSkeleton/>)
                    
                    :authorizedUser.cart ? (
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
          {/* profile sidenav */}
            <div className="offcanvas offcanvas-end custom-profile-nav text-center text-md-left" tabIndex="-1" id="profileSideNav" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-body profile-custom-container">
                        <button type="button" className="profile-back-btn-container" data-bs-dismiss="offcanvas" aria-label="Close">
                                <BsArrowLeftShort className='profile-back-btn'/>
                        </button>
            {isUserLoading ? (<UserProfileSkeleton/>):(
                    <>
                        <div className='row profile-container mb-4'>
                            <div className='col-md profile-pic-container'>
                                <img src={profile} className='img-fluid'/>
                            </div>
                            <div className='col-md user-info-container'>
                                <h4 className='user-name'>{`${authorizedUser.firstName} ${authorizedUser.lastName}`}</h4>
                                <h6 className='user-address'>{authorizedUser.address}</h6>
                                <p className='user-membership'>{authorizedUser ? (`${authorizedUser.memberShip === undefined ? (''):(authorizedUser.memberShip)}`):('')}</p>
                            </div>
                        </div>
                    <div className='account-overall-container'>
                        <div className='accountDetails-container'>
                                {/* account details */}
                                <h5 className='account-details-title'>Account Details</h5>
                            <div className='account-details-container mb-4'>
                                <div className='account-details'>
                                    <div className='balance-container'>
                                        <FaWallet className='wallet-icon'/>
                                        <p className='balance'>Balance</p>
                                        <p className='balance-number'>&#8369;{numeral(authorizedUser.balance).format('0,0')}</p>
                                    </div>
                                    <div className='payLater-container'>
                                        <BsFillCreditCard2BackFill className='card-icon'/>
                                        <p className='paylater'>PayLater</p>
                                        <p className='paylater-number'>&#8369;{numeral(authorizedUser.payLater).format('0,0')}</p>
                                    </div>
                                    <div className='vouchers-container'>
                                        <HiOutlineTicket className='vouchers-icon'/>
                                        <p className='vouchers'>PayLater</p>
                                        <p className='vouchers-number'>{authorizedUser.vouchers ? (`${authorizedUser.vouchers.length > 100 ? (`${authorizedUser.vouchers.length}+`):(authorizedUser.vouchers.length)}`):(0)}</p>
                                    </div>
                                </div>
                            </div>
                            {/* purchase */}
                            <h5 className='purchase-details-title'>My Purchases</h5>
                            <div className='purchase-details-container'>
                                <div className='purchase-details'>
                                    <div className='toShip-container'>
                                        <span className='icons-container'>
                                            <VscPackage className='package-icon'/>
                                            <span className='overlay-cotainer'>{authorizedUser.toShip ? (authorizedUser.toShip.length):(0)}</span>
                                        </span>
                                        <p>To Ship</p>
                                    </div>
                                    <div className='toReceive-container'>
                                        <span className='icons-container'>
                                            <TbTruckDelivery className='toReceive-icon'/>
                                            <span className='overlay-cotainer'>{authorizedUser.toReceive ? (authorizedUser.toReceive.length):(0)}</span>
                                        </span>
                                        <p>To Receive</p>
                                    </div>
                                    <div className='toReviews-container'>
                                        <span className='icons-container'>
                                            <AiOutlineStar className='toReview-icon'/>
                                                <span className='overlay-cotainer'>{authorizedUser.toReview ? (authorizedUser.toReview.length):(0)}</span>
                                        </span>
                                        <p>To Review</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* account settings */}
                    <div className='account-settings'>
                        <button onClick={()=>{userSettingsOn ? (setUserSettingsOn(false)):(setUserSettingsOn(true))}} className={` ${userSettingsOn ? 'settings-button-on':'settings-button'}`} type="button">
                            <span className='left-side'>
                                <FaRegUserCircle/>
                                <p>Account Settings</p>
                            </span>
                            <span className='right-side'>
                                { userSettingsOn ? (<FaChevronDown/>):(<FaChevronRight/>)}
                            </span>
                        </button>
                        <div className={`user-settings-card ${userSettingsOn ? 'user-settings-card-on':''}`}>
                            <div className="userName-card-user">
                                <div className='left-side'>
                                    <FaUserAlt className='user-icon'/>
                                    <p className='username-name'>Username</p>
                                </div>
                                <div className='right-side'>
                                    {authorizedUser.userName}
                                    <button type='button'><FaUserEdit/></button>
                                </div>
                            </div>
                            <div className="userName-card-email">
                                <div className='left-side'>
                                    <HiMail className='mail-icon'/>
                                    <p className='mail-name'>Email</p>
                                </div>
                                <div className='right-side'>
                                    {authorizedUser.email}
                                    <button type='button'><FaUserEdit/></button>
                                </div>
                            </div>
                            <div className="userName-card-phone">
                                <div className='left-side'>
                                    <AiTwotonePhone className='phone-icon'/>
                                    <p className='phone-name'>Phone</p>
                                </div>
                                <div className='right-side'>
                                    {authorizedUser.number}
                                    <button type='button'><FaUserEdit/></button>
                                </div>
                            </div>
                            <div className="userName-card-key">
                                <div className='left-side'>
                                    <FaKey className='key-icon'/>
                                    <p className='key-name'>Change password</p>
                                </div>
                                <div className='right-side'>
                                    <button type='button'><FaChevronRight/></button>
                                </div>
                            </div>
                            <div className="userName-lagout-container">
                                <button className='logout' onClick={()=>{sessionStorage.removeItem('userId'); location.reload()}}>Sign out</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </>
            )}
                    
                </div>
            </div>

            <Outlet />
        </section>

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

// Layout.propTypes = {
//     authorizedId:PropTypes.string,
//     authorizedUser:PropTypes.object,
//   };
export default Layout