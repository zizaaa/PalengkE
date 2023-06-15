import { Outlet,Link } from "react-router-dom"
import { HiShoppingCart } from "react-icons/hi"
import { AiOutlineUser } from "react-icons/ai"
import { BiChevronDown} from "react-icons/bi"
import { HiMenuAlt3 } from "react-icons/hi"
import { BsFacebook, BsInstagram,BsTwitter } from "react-icons/bs"
import { FaFacebookMessenger} from "react-icons/fa"
import logo from '../assets/logo.png'
import logo_2 from '../assets/logo2.png'
import { useState,useEffect } from "react"

const Layout = () => {
    const [isDropDown, setIsDropDown] = useState(false);
    const [isFixed, setIsFixed]= useState(false)
    
    // dropdown function
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

                          <Link to='/shop' type="button" className="link shop">
                              Shop 
                              <span className="hoverLine"></span>
                          </Link>

                          <Link to='/contact' className="link contact">
                              Contact Us
                              <span className="hoverLine"></span>
                          </Link>
                        </div>

                        <Link to='/' className="logo-container">
                          <img src={logo} className="img-fluid"/>
                        </Link>

                        <div className="user-container d-none d-lg-flex">
                            <button className="cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartSideNav" aria-controls="offcanvasRight">
                                <HiShoppingCart/>
                            </button>
                            <button className="user" data-bs-toggle="offcanvas" data-bs-target="#profileSideNav" aria-controls="offcanvasRight">
                                <AiOutlineUser/>
                            </button>
                        </div>

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

                          <div className="dropdown-user-container">
                            {/* total price in cart */}
                            <button className="cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartSideNav" aria-controls="offcanvasRight">
                              <HiShoppingCart/>
                              <p className="total-price">
                                &#8369;  {/* peso sign */}
                                <span>00.00</span>
                              </p>
                            </button>
                            <button className="user" data-bs-toggle="offcanvas" data-bs-target="#profileSideNav" aria-controls="offcanvasRight">
                                <AiOutlineUser/> 
                                    <span className="account-name">Account Name:
                                    </span>
                            </button>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
        </nav>

        <section>
        {/* cart sidenav */}
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="cartSideNav" aria-labelledby="offcanvasRightLabel">
              <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Cart</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>

              <div className="offcanvas-body">
                ...
              </div>
          </div>
          {/* profile sidenav */}
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="profileSideNav" aria-labelledby="offcanvasRightLabel">
              <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Profile</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>

              <div className="offcanvas-body">
                ...
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

export default Layout