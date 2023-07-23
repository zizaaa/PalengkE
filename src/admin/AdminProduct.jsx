import { Link } from "react-router-dom";
import { FetchProduct } from "../FetchProduct";
import { FaEdit,FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Swal from 'sweetalert2';
import { useState } from "react";


const AdminProduct = () => {
    const { data } = FetchProduct();

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    
    if (data === undefined) {
        // Data is not yet available, you can show a loading message or a default state here.
        return <div>Loading...</div>;
    }
    
    // Logic to calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    // Logic to slice the array based on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Reverse the data array
    const reversedData = [...data].reverse();
    
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

    const deleteProduct =async(id)=>{
        try {
            const env = import.meta.env;
            const uri = env.VITE_REACT_SERVER_URL

            await axios.delete(`${uri}/products/${id}`)
            Swal.fire({
                icon: 'success',
                title: 'Successfully deleted',
                confirmButtonColor:'rgb(67,94,57)'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                confirmButtonColor:'rgb(67,94,57)'
            });
        }
    }
return (
    <div className="adminProduct">
        <div className="product-head">
            <h1>Products</h1>
            <p>Add, edit, or remove products here</p>
            <div className="head-button-container">
                <Link to="/adminDashboard/products/addproduct">Add</Link>
                <div className="pagination-button-container">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                    </button>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                    </button>
                </div>
            </div>
        </div>
        {
            reversedData.slice(startIndex, endIndex).map((product)=>(
            <div key={product._id} className="product-boxes">
                <div className="main-product-box-container">
                    <div className="product-img-container">
                        <img src={product.img[0].imgOne}/>
                    </div>
                    <div className="product-info-container">
                        <p>ID: {product._id}</p>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        {/* <p>Description: {product != undefined ? (product.description).length <= 100 ? product.description :`${(product.description).slice(0,100)}...`:''}
                        </p> */}
                    </div>
                </div>
                <div className="button-container">
                    <Link to={`/adminDashboard/products/editproduct/${product._id}`} className="edit-button">
                        <span className="Icon">
                            <FaEdit/>
                        </span>
                        Edit
                    </Link>
                    <button onClick={()=>{deleteProduct(product._id)}} className="delete-button">
                        <span className="Icon">
                            <FaTrashAlt/>
                        </span>
                        Delete
                    </button>
                </div>
            </div>
            
            ))
        }
    </div>
  )
}

export default AdminProduct