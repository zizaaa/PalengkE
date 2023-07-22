import axios from "axios"
import { useEffect, useState } from 'react';
import { FaChevronLeft,FaChevronRight } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { FetchProduct } from "../../FetchProduct";
import { FetchUsers } from "../../FetchUsers";
import ProductsSkeleton from "../skeletonLoading/ProductsSkeleton";
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL

const Fruits = () => {
  const { data,isProductLoading } = FetchProduct();
  const { authorizedUser } = FetchUsers();

  const navigate = useNavigate();
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [toLoading,setToLoading] = useState('');
  const [isUserLoading,setIsUserLoading] = useState(true);

    const itemsPerPage = 12;
    // Logic to calculate the total number of pages
    const totalPages = Math.ceil((data.filter((item)=>item.category==='Fruits')).length / itemsPerPage);
    // Logic to slice the array based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  let choosenProducts = {};

  const addToCart= async(e)=>{
    if(authorizedUser.userName != undefined){
        const currentCart = authorizedUser.cart
        const currentUserId = authorizedUser._id
        const productId = e.target.parentElement.parentElement.id
        setToLoading(productId)
        setIsLoading(true)

        data.filter((product)=> productId === product._id ? choosenProducts = product:null)

        if(currentCart != ''){
            let bool = false;
            const newCart = currentCart.map((item)=>{
                if(item.id === choosenProducts._id){
                    const updatedItem = {
                        ...item,
                        item:1 + item.item,
                        newPrice:item.sale ? item.origPrice * (item.item + 1) :'',
                        price:item.sale ? '':item.origPrice * (item.item + 1)
                    }
                    bool = true
                    return updatedItem
                }
                return item;
            })

            if(bool){
                    try{
                        const addToCartProducts = {
                        cart:newCart
                        }
                        await axios.put(`${URL}/user/${currentUserId}`,addToCartProducts)
                        setIsLoading(false)
                    }catch(error){
                        alert(error)
                    }
                    bool=false
            }else{

                    try{
                        const addToCartProducts = {
                        cart:[...currentCart,{
                            id:choosenProducts._id,
                            name:choosenProducts.name,
                            newPrice:choosenProducts.newPrice,
                            salePercentage:choosenProducts.salePercentage,
                            price:choosenProducts.price,
                            origPrice: choosenProducts.sale ?choosenProducts.newPrice:choosenProducts.price,
                            quantity:choosenProducts.quantity,
                            bestSeller:choosenProducts.bestSeller,
                            sale:choosenProducts.sale,
                            category:choosenProducts.category,
                            img:choosenProducts.img,
                            usersProductReviews:choosenProducts.usersProductReviews,
                            productSold:choosenProducts.productSold,
                            description:choosenProducts.description,
                            checked:false,
                            item:1,
                        }]
                        }
                        await axios.put(`${URL}/user/${currentUserId}`,addToCartProducts)
                        setIsLoading(false)
                    }catch(error){
                        alert(error)
                    }
            }
        }else{
                try{
                    const addToCartProducts = {
                    cart:[...currentCart,{
                        id:choosenProducts._id,
                        name:choosenProducts.name,
                        newPrice:choosenProducts.newPrice,
                        salePercentage:choosenProducts.salePercentage,
                        price:choosenProducts.price,
                        origPrice: choosenProducts.sale ?choosenProducts.newPrice:choosenProducts.price,
                        quantity:choosenProducts.quantity,
                        bestSeller:choosenProducts.bestSeller,
                        sale:choosenProducts.sale,
                        category:choosenProducts.category,
                        img:choosenProducts.img,
                        usersProductReviews:choosenProducts.usersProductReviews,
                        productSold:choosenProducts.productSold,
                        description:choosenProducts.description,
                        checked:false,
                        item:1,
                    }]
                    }
                    await axios.put(`${URL}/user/${currentUserId}`,addToCartProducts)
                    setIsLoading(false)
                }catch(error){
                    alert(error)
                }
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
    <section>
            <div className="shop-filter">
            <div className="left-side">
              <h6 className="shop-sort-btn">Sort by:</h6>
              <button className="shop-sort-btn" onClick={()=>{setSort('Best Seller')}}>Best Seller</button>
              <button className="shop-sort-btn" onClick={()=>{setSort('Sale')}}>Sale</button>
              <button className="shop-sort-btn" onClick={()=>{setSort('Low')}}>Low to High Price</button>
              <button className="shop-sort-btn" onClick={()=>{setSort('High')}}>High to Low Price</button>
            </div>
            <div className="right-side">
              <input type="search" onChange={(e)=>{setSort(e.target.value)}} className="search" placeholder="Search product..."/>
              {/* <button className="search-btn">Search</button> */}
            </div>
        </div>
            <div className="shop-flex-container">
            {isProductLoading ? <ProductsSkeleton />:data.filter((item,index,data)=>{
                if(item.category==='Fruits'){
                  if(sort === ''){
                    return item;
                  }else if(item.name.toLowerCase().includes(sort.toLocaleLowerCase())){
                      return item;
                  }else if(sort === 'Best Seller'){
                      if(item.bestSeller){
                        return item;
                      }
                  }else if(sort === 'Sale'){
                      if(item.sale){
                        return item;
                      }
                  }else if(sort === 'Low'){
                    return data.sort((a,b)=> a.price - b.price)
                  }else if(sort === 'High'){
                    return data.sort((a,b)=> b.price - a.price)
                  }
                }
            }).slice(startIndex, endIndex).map(product=>(
              <div className='shop-custom-box' id={product._id} key={product._id}>
                <div className='shop-img-container'>
                  <img src={product.img[0].imgOne}/>
                  {product.bestSeller ? (
                    <span className="bestSeller-overlay-container">
                        <p>Best Seller</p>
                    </span>
                  ):null}
                  {product.sale ? (
                    <span className="sale-overlay-container">
                        <p>{`${product.salePercentage}% off`}</p>
                    </span>
                  ):null}
                    <Link to={`/productInfo/${product._id}`}  className="quick-view-btn">Quick view</Link>
                </div>
                <div className='shop-product-info-container'>
                  <h5 className='shop-product-name'>{product.name}</h5>
                  <span className="shop-price-container">
                      {product.sale ?  
                        <>
                          <p className='shop-product-Oldprice text-decoration-line-through'>&#8369;{product.price} </p>
                          <span className="separator">-</span>
                          <p className='shop-product-newPrice'> &#8369;{product.newPrice}</p>
                        </>
                        :
                        <p className='shop-product-price'>&#8369;{product.price}</p>}
                    </span>

                    <div className="product-spinner-container" id={product._id}>
                        <div className={`${isLoading && toLoading === product._id || isUserLoading ? 'spinner-border spinner-border-on':'spinner-border-off'}`} role="status">
                          <button className={`${isLoading && toLoading === product._id || isUserLoading ? 'visually-hidden':''}`} type='button' onClick={addToCart}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
            ))
            }
            </div>
            <div className="shop-pagination">
                <div className="pagination-container">
                    <p>Page</p>
                    <span><p>{currentPage}</p>/
                    <p>{totalPages}</p></span>
                    <button className={`${currentPage === 1 ? 'd-none':'d-flex items-center py-2'}`} onClick={goToPreviousPage}><FaChevronLeft /></button>
                    <button className={`${currentPage === totalPages ? 'd-none':'d-flex items-center py-2'}`} onClick={goToNextPage}><FaChevronRight /></button>
                </div>
            </div>
</section>
  )
}
export default Fruits