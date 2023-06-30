import axios from "axios"
import { Outlet,Link } from "react-router-dom"
import { HiShoppingCart,HiMail } from "react-icons/hi"
import { AiOutlineUser,AiOutlineStar,AiTwotonePhone } from "react-icons/ai"
import { HiMenuAlt3,HiOutlineTicket } from "react-icons/hi"
import { BsArrowLeftShort,BsFacebook, BsInstagram,BsTwitter,BsFillCreditCard2BackFill } from "react-icons/bs"
import {FaKey,FaUserEdit, FaFacebookMessenger,FaWallet,FaRegUserCircle, FaUserAlt, FaChevronRight, FaChevronDown} from "react-icons/fa"
import { MdOutlineDeleteOutline, MdLocationPin } from "react-icons/md"
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
import Swal from 'sweetalert2'
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL

const Layout = () => {
    const { authorizedId,authorizedUser } = FetchUsers()

    const [isDropDown, setIsDropDown] = useState(false);
    const [userSettingsOn, setUserSettingsOn] = useState(false)
    const [isUserLoading,setIsUserLoading] = useState(true)
    const [isProfileLoading, setIsProfileLoading] = useState(false)
    const dropDown=()=>{
        isDropDown ? setIsDropDown(false):setIsDropDown(true)
    }

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
        setErrorMessage('')
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
        const deleting = document.querySelectorAll('.true-cart-checked')

        deleting.forEach((parent)=>{
            parent.style = 'opacity:0.2'
        })

        setIsAllSelected(false)
        currentCart.forEach((selectedItem)=>{
            if(selectedItem.checked){
                selectedCount += 1
            }
        })
        
        if(selectedCount >= 1 ){
            // document.querySelectorAll('.true-cart-checked').style = 'opacity:0.2'
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
        const parent = e.target.parentNode.parentNode
        const currentCart = authorizedUser.cart

            parent.style = 'opacity:0.2;'
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

    // checked item total price
    let totalPrice = 0;
    const totalPriceFunc =()=>{
        const currentCart = authorizedUser.cart
        if(currentCart != undefined){
            currentCart.forEach(item => {
                if(item.checked){
                    if (item.sale) {
                        totalPrice += item.newPrice;
                    } else {
                        totalPrice += item.price;
                    }
                }
            });
        }
    }
    totalPriceFunc();


    // edit username
    const editUserName =()=>{
        Swal.fire({
        input: 'text',
        inputLabel: 'Edit username',
        inputPlaceholder: 'Enter your new username',
        inputAttributes: {
            'aria-label': 'Enter your new username',
        },
        showCancelButton: true,
        allowOutsideClick:false,
        confirmButtonColor: "#435e39",
        showLoaderOnConfirm: true,
        preConfirm:async(result)=>{
            if(result){
                try {
                    let userNameNotExist=true;
                    const { data } = await axios.get(`${URL}/users`);
                        data.map(async(user)=>{
                            if(result === user.userName){
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Username is already taken!',
                                    confirmButtonColor: "#435e39",
                                })
                                    userNameNotExist = false;
                            }
                            if(userNameNotExist){
                                try{
                                    const editUserName = {
                                        userName:result
                                    }
                                    await axios.put(`${URL}/user/${authorizedId}`,editUserName)
                                        Swal.fire({
                                            icon:"success",
                                            title:'Successful',
                                            text:"Username changed",
                                            confirmButtonColor: "#435e39",
                                        })
                                }catch(error){
                                    Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',
                                    confirmButtonColor: "#435e39",
                                    })
                                }
                            }
                        })
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        confirmButtonColor: "#435e39",
                        })
                }
            }
        }
        })
    }

    //edit email
    const editEmail =()=>{
        Swal.fire({
            input: 'text',
            inputLabel: 'Edit email',
            inputPlaceholder: 'Enter your new email',
            inputAttributes: {
                'aria-label': 'Enter your new email',
            },
            showCancelButton: true,
            allowOutsideClick:false,
            confirmButtonColor: "#435e39",
            showLoaderOnConfirm: true,
            preConfirm:async(result)=>{
                if(result){
                    try{
                        let hasSign = /[@.]/.test(result);

                        if(hasSign){
                            const editEmail = {
                                email:result
                            }
                            await axios.put(`${URL}/user/${authorizedId}`,editEmail)
                                Swal.fire({
                                    icon:"success",
                                    title:'Successful',
                                    text:"Email changed",
                                    confirmButtonColor: "#435e39",
                                })
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Invalid Email!',
                                confirmButtonColor: "#435e39",
                                })
                        }

                    }catch(error){
                        Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        confirmButtonColor: "#435e39",
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please Enter your new email!',
                        confirmButtonColor: "#435e39",
                        })
                }
            }
        })
    }
    //edit phone
    const editPhone =()=>{
        Swal.fire({
            input: 'number',
            inputLabel: 'Edit phone number',
            inputPlaceholder: 'Enter your new phone number',
            inputAttributes: {
                'aria-label': 'Enter your new phone number',
            },
            showCancelButton: true,
            allowOutsideClick:false,
            confirmButtonColor: "#435e39",
            showLoaderOnConfirm: true,
            preConfirm:async(result)=>{
                if(result){
                    try{
                            const editPhone = {
                                number:result
                            }
                            await axios.put(`${URL}/user/${authorizedId}`,editPhone)
                                Swal.fire({
                                    icon:"success",
                                    title:'Successful',
                                    text:"Phone number changed",
                                    confirmButtonColor: "#435e39",
                                })

                    }catch(error){
                        Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        confirmButtonColor: "#435e39",
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please Enter your new phone number!',
                        confirmButtonColor: "#435e39",
                        })
                }
            }
        })
    }
    //edit address
    const editAddress =()=>{
        console.log('click')
        setIsCheckOut(false)
        setVoucher('')
        Swal.fire({
            title:'Change Delivery Information',
            html:
            '<input type="text" id="swal-input4" class="swal2-input" placeholder="Full Name">' +
            '<input type="number" id="swal-input5" class="swal2-input" placeholder="Contact number">' +
            '<input type="text" id="swal-input6" class="swal2-input" placeholder="Delivery Address">',
            showCancelButton: true,
            allowOutsideClick:false,
            confirmButtonColor: "#435e39",
            showLoaderOnConfirm: true,
            preConfirm:async()=>{
                const fullName = document.getElementById('swal-input4').value
                const contactnumber = document.getElementById('swal-input5').value
                const address = document.getElementById('swal-input6').value
                
                if(fullName && contactnumber && address){
                    console.log('validated')
                    try {
                        const editDeliveryInfo = {
                            deliveryInfo:{
                                fullName:fullName,
                                number:contactnumber,
                                address:address
                            }
                        }
                        await axios.put(`${URL}/user/${authorizedId}`,editDeliveryInfo)
                            Swal.fire({
                                icon:"success",
                                title:'Successful',
                                text:"Delivery Information changed",
                                confirmButtonColor: "#435e39",
                            })
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            confirmButtonColor: "#435e39",
                        })
                    }
                }else if(!fullName){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please Enter your Full name!',
                        confirmButtonColor: "#435e39",
                    })
                }else if(!contactnumber){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please Enter your Contact number!',
                        confirmButtonColor: "#435e39",
                    })
                }else if(!address){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please Enter your complete address!',
                        confirmButtonColor: "#435e39",
                    })
                }
            }
        })
    }
    //change pass
    const changePass =()=>{
        Swal.fire({
            title:'Change Password',
            html:
            '<input id="swal-input1" class="swal2-input" placeholder="Old Password">' +
            '<input id="swal-input2" class="swal2-input" placeholder="New Password">' +
            '<input id="swal-input3" class="swal2-input" placeholder="Confirm New Password">',
            showCancelButton: true,
            allowOutsideClick:false,
            confirmButtonColor: "#435e39",
            showLoaderOnConfirm: true,
            preConfirm:async()=>{
                const oldPass = document.getElementById('swal-input1').value
                const newPass = document.getElementById('swal-input2').value
                const confirmNewPass = document.getElementById('swal-input3').value
                if(oldPass && newPass === confirmNewPass && oldPass === authorizedUser.password){
                    try{
                            const changePass = {
                                password:confirmNewPass
                            }
                            await axios.put(`${URL}/user/${authorizedId}`,changePass)
                                Swal.fire({
                                    icon:"success",
                                    title:'Successful',
                                    text:"Password changed",
                                    confirmButtonColor: "#435e39",
                                })

                    }catch(error){
                        Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        confirmButtonColor: "#435e39",
                        })
                    }
                }else if(!oldPass){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please Enter your old password!',
                        confirmButtonColor: "#435e39",
                        })
                }else if(!newPass){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please Enter your new password!',
                        confirmButtonColor: "#435e39",
                        })
                }else if(!confirmNewPass){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Please Confirm your new password!',
                        confirmButtonColor: "#435e39",
                        })
                }else if(oldPass !== authorizedUser.password){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Wrong password!',
                        confirmButtonColor: "#435e39",
                    })
                }else if(newPass !== confirmNewPass){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Your new password and confirm password are not match!',
                        confirmButtonColor: "#435e39",
                    })
                }
            }
        })
    }

    const uploadImg =async(e)=>{
        setIsProfileLoading(true)
        const img = e.target.files[0]
            try {
                const formData = new FormData();
                formData.append('img', img)

                await axios.put(`${URL}/user/img/${authorizedId}`,formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                setIsProfileLoading(false)
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'File upload failed!. Please try again later',
                    confirmButtonColor: "#435e39",
                })
            }
    }

    useEffect(() => {
        window.addEventListener('resize', ()=>{
            if (window.innerWidth >= 993) {
                setIsDropDown(false);
            }
        });
    }, []);

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
        <nav id='nav'>
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

                        {authorizedId != null  ? (                        
                            <div className="user-container d-none d-lg-flex">
                                <button className="cart" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartSideNav" aria-controls="offcanvasRight">
                                    <HiShoppingCart/>
                                        {authorizedUser.cart != undefined ? authorizedUser.cart.length <=0 ?'':(
                                            <span className='cart-overlay-counter'>{authorizedUser.cart.length}</span>
                                        ):''}
                                </button>
                                <button className="user" data-bs-toggle="offcanvas" data-bs-target="#profileSideNav" aria-controls="offcanvasRight">
                                    <div className={`${isProfileLoading ? '':'profile-nav-custom-spinner-unloading'}profile-nav-custom-spinner`}>
                                        <div className={`${isProfileLoading ? 'spinner-border':''}`} role="status">
                                        </div>
                                    </div>
                                    {authorizedUser.img !== undefined ? <img src={`${URL}/${authorizedUser.img}`}/>:<AiOutlineUser/>}
                                </button>
                            </div>
                        ):(
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
        <div className="offcanvas offcanvas-end custom-sidenav-cart" data-bs-backdrop="true" tabIndex="-1" id="cartSideNav" aria-labelledby="offcanvasScrollingLabel">
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
                        authorizedUser.cart.map((cart)=> (
                        <div className={`${cart.checked}-cart-checked cart-product-main-container`} key={cart.id}>
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
                        <button type="button" onClick={()=>{setIsCheckOut(false),setVoucher('')}} className="checkout-back-btn">
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
                                <button type='button' onClick={editAddress} data-bs-dismiss="offcanvas" aria-label="Close"><FaUserEdit/></button>
                            </div>
                        </div>
                        <div className="user-location-container">
                            <div className="user-location-info">
                                <span className="user-name-phone">
                                    <p className="user-name">
                                        {authorizedUser.deliveryInfo === undefined  ? `${authorizedUser.firstName}  ${authorizedUser.lastName}`:authorizedUser.deliveryInfo.fullName}
                                    </p>
                                    <span className="divider">
                                        {authorizedUser.deliveryInfo === undefined  ? '|':'|'}
                                    </span>
                                    <p className="user-phone">
                                    {authorizedUser.deliveryInfo === undefined  ? authorizedUser.number:authorizedUser.deliveryInfo.number}
                                    </p>
                                </span>
                                <p className="user-add">
                                {authorizedUser.deliveryInfo === undefined ? authorizedUser.address:authorizedUser.deliveryInfo.address}
                                </p>
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
          {/* profile sidenav */}
            <div className="offcanvas offcanvas-end custom-profile-nav text-center text-md-left" data-bs-backdrop="true" tabIndex="-1"  id="profileSideNav" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-body profile-custom-container">
                        <button type="button" className="profile-back-btn-container" data-bs-dismiss="offcanvas" aria-label="Close">
                                <BsArrowLeftShort className='profile-back-btn'/>
                        </button>
            {isUserLoading ? (<UserProfileSkeleton/>):(
                    <>
                        <div className='row profile-container mb-4'>
                            <div className='col-md profile-pic-container'>
                                <div className="img-container">
                                    {authorizedUser.img !== undefined ? <img src={`${URL}/${authorizedUser.img}`}/>:<img src={profile}/>}
                                    <input onChange={(e)=>{uploadImg(e)}} className="custom-file-input" name="img" type="file" disabled={isProfileLoading ? true:false}/>
                                    <div className={`${isProfileLoading ? '':'profile-custom-spinner-unloading'} profile-custom-spinner`}>
                                        <div className={`${isProfileLoading ? 'spinner-border':''}`} role="status">
                                        </div>
                                    </div>
                                </div>
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
                                        <p className='vouchers'>Vouchers</p>
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
                                    <button type='button' onClick={editUserName} data-bs-dismiss="offcanvas" aria-label="Close"><FaUserEdit/></button>
                                </div>
                            </div>
                            <div className="userName-card-email">
                                <div className='left-side'>
                                    <HiMail className='mail-icon'/>
                                    <p className='mail-name'>Email</p>
                                </div>
                                <div className='right-side'>
                                    {authorizedUser.email}
                                    <button type='button' onClick={editEmail} data-bs-dismiss="offcanvas" aria-label="Close"><FaUserEdit/></button>
                                </div>
                            </div>
                            <div className="userName-card-phone">
                                <div className='left-side'>
                                    <AiTwotonePhone className='phone-icon'/>
                                    <p className='phone-name'>Phone</p>
                                </div>
                                <div className='right-side'>
                                    {authorizedUser.number}
                                    <button type='button' onClick={editPhone} data-bs-dismiss="offcanvas" aria-label="Close"><FaUserEdit/></button>
                                </div>
                            </div>
                            <div className="userName-card-key">
                                <div className='left-side'>
                                    <FaKey className='key-icon'/>
                                    <p className='key-name'>Change password</p>
                                </div>
                                <div className='right-side'>
                                    <button type='button' onClick={changePass} data-bs-dismiss="offcanvas" aria-label="Close"><FaChevronRight/></button>
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
        </section>

        <section className="outlet-sections">
            <Outlet />
        </section>

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

export default Layout