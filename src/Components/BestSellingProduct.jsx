
import axios from "axios"
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL
import { Link } from "react-router-dom"
import { AiOutlineSwapRight } from 'react-icons/ai'

const BestSellingProduct = (props) => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [toLoading,setToLoading] = useState('');
    const currentPage = 1;
    const itemsPerPage = 4;
    // Logic to slice the array based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const choosenProducts = []

    const addToCart= async(e)=>{
        if(props.authorizedUser.userName != undefined){
            const currentCart = props.authorizedUser.cart
            const currentUserId = props.authorizedUser._id
            const productId = e.target.parentElement.parentElement.id
            setToLoading(productId)
            setIsLoading(true)

            await props.data.filter((product)=> productId === product._id ? choosenProducts.push(product):null)
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
    // console.log()
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
                    <button onClick={()=>setCategory('Fish')}>Fish and SeaShells</button>
                    <button onClick={()=>setCategory('Vegetables')}>Up And Lowland Vegetables</button>
                    <button onClick={()=>setCategory('Fruits')}>Fruits</button>
                    <button onClick={()=>setCategory('Rice')}>Rice</button>
                    <button onClick={()=>setCategory('Herbs & Spices')}>Herbs and Spices</button>
                </div>
            </div>
            <div className="product-containers mt-2">
            <div className='flex-container'>
                {props.data.filter((item)=>{
                    if(category === ''){
                        return item
                    }else if(category === 'Livestock and Poultry Products'){
                        if(item.category === 'Livestock and Poultry Products'){
                            return item;
                        }
                    }else if(category === 'Fish'){
                        if(item.category === 'Fish'){
                            return item;
                        }
                    }else if(category === 'Vegetables'){
                        if(item.category === 'Upland Vegetables' || item.category === 'Lowland Vegetables'){
                            return item;
                        }
                    }else if(category === 'Fruits'){
                        if(item.category === 'Fruits'){
                            return item;
                        }
                    }else if(category === 'Rice'){
                        if(item.category === 'Rice'){
                            return item;
                        }
                    }else if(category === 'Herbs & Spices'){
                        if(item.category === 'Herbs & Spices'){
                            return item;
                        }
                    }
                }).slice(startIndex, endIndex).map((item)=>(
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
                            <div className={`${isLoading && toLoading === item._id ? 'spinner-border spinner-border-custom-on':'spinner-border-custom'}`} role="status">
                                <button id={item._id} className={`${isLoading && toLoading === item._id ? 'visually-hidden':''}`} type='button' onClick={addToCart}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
    </section>
)
}
BestSellingProduct.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    authorizedUser: PropTypes.object,
    // fetchUserData: PropTypes.func,
  };
export default BestSellingProduct