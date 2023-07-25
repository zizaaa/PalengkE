import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AddProductForm = () => {
    const navigate = useNavigate()
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState('1KG');
    const [category, setCategory] = useState('Livestock and Poultry Products');
    const [imgOne, setimgOne] = useState('');
    const [imgTwo, setimgTwo] = useState('');
    const [imgThree, setimgThree] = useState('');
    const [stocks, setStocks] = useState(0);
    const [description, setDescription] = useState('');
    
    const addProduct = async(e)=>{
        e.preventDefault();

        if(productName && price && quantity && category && imgOne && imgTwo && imgThree && stocks && description){
            const productImg = {
                imgOne:imgOne,
                imgTwo:imgTwo,
                imgThree:imgThree
            }
            const newProduct = {
                name:productName,
                price:price,
                quantity:quantity,
                category:category,
                img:[productImg],
                stock:stocks,
                description:description
            }
            
                try {
                    const env = import.meta.env;
                    const uri = env.VITE_REACT_SERVER_URL
    
                        await axios.post(`${uri}/products`, newProduct).then(()=>{
                            Swal.fire({
                                icon: 'success',
                                title: 'Successful',
                                confirmButtonColor:'rgb(67,94,57)'
                            });
                        })
                        navigate('/adminDashboard/products/')
    
                        await axios.post(`${uri}/event`,{
                            event:'Product: ' + productName + ' ' + 'recently added in the shop listings.' 
                        })
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message,
                        confirmButtonColor:'rgb(67,94,57)'
                    });
                }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Please Compelete all the inputs",
                confirmButtonColor:'rgb(67,94,57)'
            });
        }
    }

  return (
    <div className="AddProductForm">
        <div className="AddProductForm-container">
            <h1>Add product</h1>
            <p>Upload your product</p>
        </div>
        <div className="AddProductForm-form-container py-3">
            <form>
                <div className="form-input-container">
                    <div className="input-container">
                            <input type="text" onChange={(e)=>{setProductName(e.target.value)}} placeholder="Product name"/>
                        <div className="price-input">
                            <input type="number" onChange={(e)=>{setPrice(e.target.value)}} placeholder="Price"/>
                            /
                            <input type="text" onChange={(e)=>{setQuantity(e.target.value)}} placeholder="1kg"/>
                        </div>
                        {/* <input type="text" onChange={(e)=>{setCategory(e.target.value)}} placeholder="Category"/> */}
                        <select name="category" className="category" onChange={(e) => setCategory(e.target.value)}>
                            <option value="Livestock and Poultry Products">Livestock and Poultry Products</option>
                            <option value="Fish">Fish</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Rice">Rice</option>
                            <option value="Herbs & Spices">Herbs & Spices</option>
                        </select>
                        <input type="number" onChange={(e)=>{setStocks(e.target.value)}} placeholder="Quantity of items in stocks"/>
                    </div>
                    <div className="right-side">
                        <input type="text" onChange={(e)=>{setimgOne(e.target.value)}} placeholder="Img link one"/>
                        <input type="text" onChange={(e)=>{setimgTwo(e.target.value)}} placeholder="Img link two"/>
                        <input type="text" onChange={(e)=>{setimgThree(e.target.value)}} placeholder="Img link three"/>
                        <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder="Product Description"></textarea>
                    </div>
                </div>
                <button type="submit" onClick={(e)=>{addProduct(e)}}>Add product</button>
            </form>
        </div>
    </div>
  )
}

export default AddProductForm