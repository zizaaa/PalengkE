import { Link } from "react-router-dom";
import { FetchProduct } from "../FetchProduct";
import { FaEdit,FaTrashAlt } from "react-icons/fa";
import axios from "axios";


const AdminProduct = () => {
    const { data } = FetchProduct();

    const deleteProduct =async(id)=>{
        try {
            const env = import.meta.env;
            const uri = env.VITE_REACT_SERVER_URL

            await axios.delete(`${uri}/products/${id}`)
            console.log('deleted')
        } catch (error) {
            console.log(error)
        }
    }
return (
    <div className="adminProduct">
        <div className="product-head">
            <h1>Products</h1>
            <p>Add, edit, or remove products here</p>
            <Link to="/adminDashboard/products/addproduct">Add</Link>
        </div>
        {
            data.map((product)=>(
            <div key={product._id} className="product-boxes">
                <div className="main-product-box-container">
                    <div className="product-img-container">
                        <img src={product.img[0].imgOne}/>
                    </div>
                    <div className="product-info-container">
                        <p>ID: {product._id}</p>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        <p>Description: {product.description}</p>
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