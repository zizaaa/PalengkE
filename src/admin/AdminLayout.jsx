import { Outlet } from "react-router-dom"
import React, { useState } from 'react';
import  logo  from '../assets/logo.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { HiShoppingCart,HiMail } from "react-icons/hi"
import { PiUsersThreeLight } from "react-icons/pi"
import { MdOutlineChecklist } from "react-icons/md"
import { TbNotification } from "react-icons/tb"
import { FaHandsHelping } from "react-icons/fa"
import { FaGears } from "react-icons/fa6"

const AdminLayout = () => {

  const [isUserInfoVisible, setUserInfoVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggleUserInfo = () => {
    setUserInfoVisible(!isUserInfoVisible);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement your search functionality here
    console.log(`Search submitted: ${searchQuery}`);
  };
  return (
    
    
    
    <div className="Layout">
       <div className="admin-layout">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} />
        </div>
        <hr />
        <ul className="sidebar-menu">
            <li>
            <button>
                <RxHamburgerMenu />
                <a href="/">Dashboard</a>
              </button>
            </li>
            <li>
              <button>
                <HiShoppingCart />
                <a href="/products">Products</a>
              </button>
            </li>
            <li>
              <button>
              <PiUsersThreeLight />
                <a href="/users">Users</a>
              </button>
            </li>
            <li>
              <button>
              <MdOutlineChecklist />
                <a href="/order-status">Order Status</a>
              </button>
            </li>
            <li>
              <button>
              <TbNotification />  
                <a href="/notifications">Notifications</a>
              </button>
            </li>
          </ul>
          <hr />
          <ul className="sidebar-menu">
            <li>
              <button>
                <FaHandsHelping />
                <a href="/help-center">Help Center</a>
              </button>
            </li>
            <li>
              <button>
                <FaGears />
                <a href="/settings">Settings</a>
              </button>
            </li>
          </ul>
      </div>
    </div>
    <nav className="navbar">
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="user-info">
      <div className="user-text">
              <span className="user-name">John Doe</span>
              <span className="user-email">john.doe@example.com</span>
            </div>
        <button onClick={handleToggleUserInfo}>Toggle User Info</button>
        {isUserInfoVisible && (
          <div className="user-details">
            {/* <img src="user-avatar.png" alt="User Avatar" className="avatar" /> */}
           
          </div>
        )}
      </div>
    </nav>
        
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout