import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
    const navigate = useNavigate()
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState('1KG');
    const [category, setCategory] = useState('');
    const [imgOne, setimgOne] = useState('');
    const [imgTwo, setimgTwo] = useState('');
    const [imgThree, setimgThree] = useState('');
    const [stocks, setStocks] = useState(0);
    const [description, setDescription] = useState('');
    
    const addProduct = async(e)=>{
        e.preventDefault();

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
        console.log(newProduct)
            try {
                const env = import.meta.env;
                const uri = env.VITE_REACT_SERVER_URL

                    await axios.post(`${uri}/products`, newProduct)
                    navigate('/adminDashboard/products/')
            } catch (error) {
                console.log(error)
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
                <input type="text" onChange={(e)=>{setProductName(e.target.value)}} placeholder="Product name"/>
                <div>
                    <input type="number" onChange={(e)=>{setPrice(e.target.value)}} placeholder="Price"/>
                    /
                    <input type="text" onChange={(e)=>{setQuantity(e.target.value)}} placeholder="1kg"/>
                </div>
                <input type="text" onChange={(e)=>{setCategory(e.target.value)}} placeholder="Category"/>
                <input type="text" onChange={(e)=>{setimgOne(e.target.value)}} placeholder="Img link one"/>
                <input type="text" onChange={(e)=>{setimgTwo(e.target.value)}} placeholder="Img link two"/>
                <input type="text" onChange={(e)=>{setimgThree(e.target.value)}} placeholder="Img link three"/>
                <input type="number" onChange={(e)=>{setStocks(e.target.value)}} placeholder="Quantity of items in stocks"/>
                <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder="Product Desicription"></textarea>
                <button type="submit" onClick={(e)=>{addProduct(e)}}>Add product</button>
            </form>
        </div>
    </div>
  )
}

export default AddProductForm