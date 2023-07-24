import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import  logo  from '../assets/logo.png';
import profile from '/src/assets/profileDark.png'
import { HiShoppingCart } from "react-icons/hi"
import { PiUsersThreeLight } from "react-icons/pi"
import { MdOutlineChecklist,MdOutlineSpaceDashboard } from "react-icons/md"
import { TbNotification } from "react-icons/tb"
import { FaGears } from "react-icons/fa6"
import { AiFillGift } from "react-icons/ai"
import { FetchUsers } from "../FetchUsers";
import { GiHamburgerMenu } from "react-icons/gi"

const AdminLayout = () => {
  const location = useLocation()
  const { authorizedUser } = FetchUsers();
  const navigate = useNavigate();

  return (
    <section className="Layout">
        <div className="side-nav  d-md-flex d-none">
          <Link to="/" className="img-container">
              <img src={logo} className="img-fluid"/>
          </Link>
          <div className="admin-user-container">
            <div className="profile-container">
                <img src={profile}/>
            </div>
            <div className="admin-info">
                {
                  authorizedUser.firstName != undefined ? 
                    <>
                      <p className="seller-name">{authorizedUser.firstName}</p>
                      <p className="seller-email">{authorizedUser.email}</p>
                    </>
                  :
                  'Loading...'
                }
            </div>
          </div>
          <div className="navigation-links">
              <div className="main-navigation">
                  <Link to="/adminDashboard" className={`${location.pathname === '/adminDashboard' ? 'dash-link-active':''}`}>
                    <span className="links-icon">
                        <MdOutlineSpaceDashboard/>
                    </span>
                    Dashboard
                  </Link>
                  <Link to="/adminDashboard/products" className={`${location.pathname === '/adminDashboard/products' || location.pathname === '/adminDashboard/products/addproduct' || location.pathname === '/adminDashboard/products/editproduct' ? 'dash-link-active':''}`}>
                    <span className="links-icon">
                        <HiShoppingCart/>
                    </span>
                    Products
                  </Link>
                  <Link to="/adminDashboard/users" className={`${location.pathname === '/adminDashboard/users' ? 'dash-link-active':''}`}>
                    <span className="links-icon">
                        <PiUsersThreeLight/>
                    </span>
                    Users
                  </Link>
                  <Link to="/adminDashboard/orders" className={`${location.pathname === '/adminDashboard/orders' || location.pathname === '/adminDashboard/orders/toreceive' || location.pathname === '/adminDashboard/orders/delivered' ? 'dash-link-active':''}`}>
                    <span className="links-icon">
                        <MdOutlineChecklist/>
                    </span>
                    Order Status
                  </Link>
                  <Link to="/adminDashboard/notifications" className={`${location.pathname === '/adminDashboard/notifications' ? 'dash-link-active':''}`}>
                    <span className="links-icon">
                        <TbNotification/>
                    </span>
                    Notifications
                  </Link>
              </div>
                <div className="utilities">
                  {/* <Link to="/adminDashboard/settings" className={`${location.pathname === '/adminDashboard/settings' ? 'dash-link-active':''}`}>
                      <span className="links-icon">
                        <FaGears/>
                      </span>
                      Settings
                  </Link> */}
                  <Link to="/adminDashboard/giveAway" className={`${location.pathname === '/adminDashboard/giveAway' ? 'dash-link-active':''}`}>
                    <span className="links-icon">
                        <AiFillGift/>
                    </span>
                    Rewards
                  </Link>
              </div>
          </div>
        </div>
        <div className="outlet">
            <nav className="d-md-none d-flex">
                <Link to="/" className="img-container">
                  <img src={logo} className="img-fluid"/>
                </Link>
                
                <div className="hamburger-menu">
                  <button className="hamburger-menu-btn" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-expanded="false" aria-controls="menu">
                    <GiHamburgerMenu/>
                  </button>
                </div>
            </nav>
            <div className="collapse collapse-custom" id="menu">
              <div className="card card-body">
                      <button onClick={()=>{navigate('/adminDashboard')}} className={`${location.pathname === '/adminDashboard' ? 'dash-link-active':''}`} data-bs-toggle="collapse" data-bs-target="#menu" aria-expanded="false" aria-controls="menu">
                        <span className="links-icon">
                            <MdOutlineSpaceDashboard/>
                        </span>
                        Dashboard
                      </button>
                      <button onClick={()=>{navigate('/adminDashboard/products')}} className={`${location.pathname === '/adminDashboard/products' || location.pathname === '/adminDashboard/products/addproduct' || location.pathname === '/adminDashboard/products/editproduct' ? 'dash-link-active':''}`} data-bs-toggle="collapse" data-bs-target="#menu" aria-expanded="false" aria-controls="menu">
                        <span className="links-icon">
                            <HiShoppingCart/>
                        </span>
                        Products
                      </button>
                      <button onClick={()=>{navigate('/adminDashboard/users')}} className={`${location.pathname === '/adminDashboard/users' ? 'dash-link-active':''}`} data-bs-toggle="collapse" data-bs-target="#menu" aria-expanded="false" aria-controls="menu">
                        <span className="links-icon">
                            <PiUsersThreeLight/>
                        </span>
                        Users
                      </button>
                      <button onClick={()=>{navigate('/adminDashboard/orders')}} className={`${location.pathname === '/adminDashboard/orders' || location.pathname === '/adminDashboard/orders/toreceive' || location.pathname === '/adminDashboard/orders/delivered' ? 'dash-link-active':''}`} data-bs-toggle="collapse" data-bs-target="#menu" aria-expanded="false" aria-controls="menu">
                        <span className="links-icon">
                            <MdOutlineChecklist/>
                        </span>
                        Order Status
                      </button>
                      <button onClick={()=>{navigate('/adminDashboard/notifications')}} className={`${location.pathname === '/adminDashboard/notifications' ? 'dash-link-active':''}`} data-bs-toggle="collapse" data-bs-target="#menu" aria-expanded="false" aria-controls="menu">
                        <span className="links-icon">
                            <TbNotification/>
                        </span>
                        Notifications
                      </button>
                      <button onClick={()=>{navigate('/adminDashboard/settings')}} className={`${location.pathname === '/adminDashboard/settings' ? 'dash-link-active':''}`} data-bs-toggle="collapse" data-bs-target="#menu" aria-expanded="false" aria-controls="menu">
                        <span className="links-icon">
                          <FaGears/>
                        </span>
                        Settings
                      </button>
              </div>
            </div>
              <Outlet/>
        </div>
    </section>
  )
}

export default AdminLayout