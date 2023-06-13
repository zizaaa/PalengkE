import { Outlet,Link } from "react-router-dom"
import { HiShoppingCart } from "react-icons/hi"
import { AiOutlineUser } from "react-icons/ai"
import { BiChevronDown} from "react-icons/bi"
import { HiMenuAlt3 } from "react-icons/hi"
import { BsFacebook, BsInstagram,BsTwitter } from "react-icons/bs"
import { FaFacebookMessenger} from "react-icons/fa"
import { useState,useEffect } from "react"

const Layout = () => {
    const [isDropDown, setIsDropDown] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // dropdown function
    const dropDown=()=>{
        isDropDown ? setIsDropDown(false):setIsDropDown(true)
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        if(windowWidth >= 993){
            setIsDropDown(false)
        }
      // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }); // Remove the empty dependency array


    return (
    <>
        <nav className="navBar my-2">
            <div className="container">
                <div className="row custom-row-style">
                    <div className={`col-12 ${isDropDown ? "nav-on-flex-container":"flex-container"}`}>
                        <div className="link-container d-none d-lg-flex">
                          <Link to='' className="link home">
                              Home 
                              <span className="hoverLine"></span>
                          </Link>
                          
                          <Link to='' className="link about">
                              About 
                              <span className="hoverLine"></span>
                          </Link>

                          <button type="button" className="link shop"  data-bs-toggle="dropdown" aria-expanded="false">
                              Shop 
                              <span className="chevronDown">< BiChevronDown /></span>
                              <span className="hoverLine"></span>
                          </button>
                              {/* drop down menu */}
                              <ul className="dropdown-menu custom-dropdown">
                                  <li>
                                      <Link to='' className="category 1">
                                        Category 1
                                        <span className="hoverLine"></span>
                                      </Link>
                                  </li>
                                  <li>
                                      <Link to='' className="category 2">
                                          Category 2
                                          <span className="hoverLine"></span>
                                      </Link>
                                  </li>
                                  <li>
                                      <Link to='' className="category 3">
                                          Category 3
                                          <span className="hoverLine"></span>
                                      </Link>
                                  </li>
                                  <li>
                                      <Link to='' className="category 4">
                                          Category 4
                                          <span className="hoverLine"></span>
                                      </Link>
                                  </li>
                                  <li>
                                      <Link to='' className="category 5">
                                          Category 5
                                          <span className="hoverLine"></span>
                                      </Link>
                                  </li>
                              </ul>

                          <Link to='' className="link contact">
                              Contact
                              <span className="hoverLine"></span>
                          </Link>
                        </div>

                        <Link to='/' className="logo-container">
                          <img src='src/assets/logo.png' className="img-fluid"/>
                        </Link>

                        <div className="user-container d-none d-lg-flex">
                          {/* total price in cart */}
                          <p className="total-price">
                              &#8369;  {/* peso sign */}
                              <span>00.00</span>
                          </p>
                          <button className="cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><HiShoppingCart/></button>
                          <Link to='' className="user"><AiOutlineUser/></Link>
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
                          <Link to='' className="link home">
                              Home 
                              <span className="hoverLine"></span>
                          </Link>
                          
                          <Link to='' className="link about">
                              About 
                              <span className="hoverLine"></span>
                          </Link>

                          <button type="button" className="link shop"  data-bs-toggle="dropdown" aria-expanded="false">
                              Shop 
                              <span className="chevronDown">< BiChevronDown /></span>
                              <span className="hoverLine"></span>
                          </button>
                              {/* drop down menu */}
                              <ul className="dropdown-menu custom-dropdown">
                                  <li>
                                      <Link to='' className="category 1">
                                        Category 1
                                        <span className="hoverLine"></span>
                                      </Link>
                                  </li>
                                  <li>
                                      <Link to='' className="category 2">
                                          Category 2
                                          <span className="hoverLine"></span>
                                      </Link>
                                  </li>
                                  <li>
                                      <Link to='' className="category 3">
                                          Category 3
                                          <span className="hoverLine"></span>
                                      </Link>
                                  </li>
                                  <li>
                                      <Link to='' className="category 4">
                                          Category 4
                                          <span className="hoverLine"></span>
                                      </Link>
                                  </li>
                                  <li>
                                      <Link to='' className="category 5">
                                          Category 5
                                          <span className="hoverLine"></span>
                                      </Link>
                                  </li>
                              </ul>

                          <Link to='' className="link contact">
                              Contact
                              <span className="hoverLine"></span>
                          </Link>

                          <div className="dropdown-user-container">
                            {/* total price in cart */}
                            <button className="cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                              <HiShoppingCart/>
                              <p className="total-price">
                                &#8369;  {/* peso sign */}
                                <span>00.00</span>
                              </p>
                            </button>
                            <Link to='' className="user"><AiOutlineUser/> <span className="account-name">Account Name:</span></Link>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
        </nav>

        <section>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

              <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">Offcanvas right</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>

              <div className="offcanvas-body">
                ...
              </div>
          </div>
            <Outlet />
        </section>

        <footer className="mt-5 py-5">
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
                            <img src="./src/assets/logo2.png" className="img-fluid"/>
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