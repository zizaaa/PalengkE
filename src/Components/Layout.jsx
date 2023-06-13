import { Outlet,Link } from "react-router-dom"
import { HiShoppingCart } from "react-icons/hi"
import { AiOutlineUser } from "react-icons/ai"
import { BiChevronDown } from "react-icons/bi"
import { HiMenuAlt3 } from "react-icons/hi"


const Layout = () => {
  return (
    <>
        <nav className="navBar my-2">
            <div className="container">
                <div className="row">
                    <div className="col-12 flex-container">
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
                            <button type="button">
                                <HiMenuAlt3/>
                            </button>
                        </div>
                  </div>

                  {/* dropdown */}
                  <div className="col-12 dropDown-menu-container">
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

        <footer>
            <h1>Footer</h1>
        </footer>
    </>
  )
}

export default Layout