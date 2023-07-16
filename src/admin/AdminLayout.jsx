import { Link, Outlet } from "react-router-dom"
import  logo  from '../assets/logo.png';
import profile from '/src/assets/profileDark.png'
import { HiShoppingCart } from "react-icons/hi"
import { PiUsersThreeLight } from "react-icons/pi"
import { MdOutlineChecklist,MdOutlineSpaceDashboard } from "react-icons/md"
import { TbNotification } from "react-icons/tb"
import { FaHandsHelping } from "react-icons/fa"
import { FaGears } from "react-icons/fa6"

const AdminLayout = () => {

  return (
    <section className="Layout">
        <div className="side-nav">
          <div className="img-container">
              <img src={logo} className="img-fluid"/>
          </div>
          <div className="navigation-links">
              <div className="main-navigation">
                  <Link to="/adminDashboard">
                    <span className="links-icon">
                        <MdOutlineSpaceDashboard/>
                    </span>
                    Dashboard
                  </Link>
                  <Link to="/adminDashboard/products">
                    <span className="links-icon">
                        <HiShoppingCart/>
                    </span>
                    Products
                  </Link>
                  <Link to="/adminDashboard/users">
                    <span className="links-icon">
                        <PiUsersThreeLight/>
                    </span>
                    Users
                  </Link>
                  <Link to="/adminDashboard/orders">
                    <span className="links-icon">
                        <MdOutlineChecklist/>
                    </span>
                    Order Status
                  </Link>
                  <Link to="/adminDashboard/notifications">
                    <span className="links-icon">
                        <TbNotification/>
                    </span>
                    Notifications
                  </Link>
              </div>
                <div className="utilities">
                  <Link to="/adminDashboard/help">
                      <span className="links-icon">
                        <FaHandsHelping/>
                      </span>
                      Help Center
                  </Link>
                  <Link to="/adminDashboard/notifications">
                      <span className="links-icon">
                        <FaGears/>
                      </span>
                      Settings
                  </Link>
              </div>
          </div>
        </div>
        <div className="nav-and-outlet">
            <nav className="dashboard-nav">
                <div className="admin-user-container">
                    <div className="admin-info">
                      <p className="seller-name">Seller Name</p>
                      <p className="seller-email">seller@gmail.com</p>
                    </div>
                    <div className="profile-container">
                        <img src={profile} className="img-fluid"/>
                    </div>
                </div>
            </nav>
            <div className="outlet">
              <Outlet/>
            </div>
        </div>
    </section>
  )
}

export default AdminLayout