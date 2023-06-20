
import axios from "axios"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FetchProduct } from "../FetchProduct";
import { FetchUsers } from "../FetchUsers";
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL
import { Link } from "react-router-dom"
import { AiOutlineSwapRight } from 'react-icons/ai'
import ProductsSkeleton from "./skeletonLoading/ProductsSkeleton";

const BestSellingProduct = () => {
    const {data,isProductLoading} = FetchProduct()
    const { authorizedUser } = FetchUsers()
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [toLoading,setToLoading] = useState('');
    const [isUserLoading,setIsUserLoading] = useState(true)
    const currentPage = 1;
    const itemsPerPage = 4;
    // Logic to slice the array based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const choosenProducts = []

    const addToCart= async(e)=>{
        if(authorizedUser.userName != undefined){
            const currentCart = authorizedUser.cart
            const currentUserId = authorizedUser._id
            const productId = e.target.parentElement.parentElement.id
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
        // console.log()
    },[authorizedUser])
    
  return (
    <section className="mt-5">
        <div className="container">
            <div className="bestselling-head-container">
                <h1>Best Selling Products</h1>
                <Link to='/shop' className="viewAll-btn">View All Products <span><AiOutlineSwapRight className="arrow-icon"/></span></Link>
            </div>
            <div className="bestSellingProducts-container mt-3">
                <div className="category-container">
                    <button onClick={()=>setCategory('Livestock and Poultry Products')}>LiveStock And Poultry Products</button>
                    <button onClick={()=>setCategory('Fish')}>Fish</button>
                    <button onClick={()=>setCategory('Vegetables')}>Vegetables</button>
                    <button onClick={()=>setCategory('Fruits')}>Fruits</button>
                    <button onClick={()=>setCategory('Rice')}>Rice</button>
                    <button onClick={()=>setCategory('Herbs & Spices')}>Herbs and Spices</button>
                </div>
            </div>
            <div className="product-containers mt-2">
            <div className='flex-container'>
                {isProductLoading ? <ProductsSkeleton/>:data.filter((item)=>{
                    if(category === '' && item.bestSeller){
                        return item
                    }else if(category === 'Livestock and Poultry Products'){
                        if(item.category === 'Livestock and Poultry Products' && item.bestSeller){
                            return item;
                        }
                    }else if(category === 'Fish'){
                        if(item.category === 'Fish' && item.bestSeller){
                            return item;
                        }
                    }else if(category === 'Vegetables'){
                        if(item.category === 'Upland Vegetables' || item.category === 'Lowland Vegetables' && item.bestSeller){
                            return item;
                        }
                    }else if(category === 'Fruits'){
                        if(item.category === 'Fruits' && item.bestSeller){
                            return item;
                        }
                    }else if(category === 'Rice'){
                        if(item.category === 'Rice' && item.bestSeller){
                            return item;
                        }
                    }else if(category === 'Herbs & Spices'){
                        if(item.category === 'Herbs & Spices' && item.bestSeller){
                            return item;
                        }
                    }
                }).slice(startIndex, endIndex).map((item)=>( item.bestSeller ?
                <div className='custom-box' id={item._id} key={item._id}>
                    <div className='img-container'>
                        <img src={item.img[0].imgOne}/>
                        {item.bestSeller ? (
                            <span className="bestSeller-overlay-container">
                                <p>Best Seller</p>
                            </span>
                    ):null}
                    {item.sale ? (
                        <span className="sale-overlay-container">
                            <p>{`${item.salePercentage}% off`}</p>
                        </span>
                    ):null}
                    <Link to={`/${item._id}`} className="quick-view-btn">Quick view</Link>
                    </div>
                    <div className='product-info-container'>
                        <h5 className='product-name'>{item.name}</h5>
                        <span className="bestSeller-price-container">
                        {item.sale ?  
                            <>
                            <p className='bestSeller-product-Oldprice text-decoration-line-through'>&#8369;{item.price} </p>
                                <span className="separator mx-1">-</span>
                            <p className='bestSeller-product-newPrice'> &#8369;{item.newPrice}</p>
                            </>
                            :
                            <p className='bestSeller-product-price'>&#8369;{item.price}</p>}
                        </span>
                        
                        <div className="bestSeller-spinner" id={item._id}>
                            <div className={`${isLoading && toLoading === item._id || isUserLoading ? 'spinner-border spinner-border-custom-on':'spinner-border-custom'}`} role="status">
                                <button id={item._id} className={`${isLoading && toLoading === item._id || isUserLoading ? 'visually-hidden':''}`} type='button' onClick={addToCart}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div> : ('')
                ))}
            </div>
            </div>
        </div>
    </section>
)
}
export default BestSellingProduct