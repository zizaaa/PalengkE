import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const EditProductForm = () => {
  const { id } = useParams();
  const data = JSON.parse(sessionStorage.getItem('data'))

  const toEdit = data.find((product) => product._id === id)

  const navigate = useNavigate()
  const [productName, setProductName] = useState(toEdit.name);
  const [price, setPrice] = useState(toEdit.price);
  const [quantity, setQuantity] = useState(toEdit.quantity);
  const [category, setCategory] = useState(toEdit.category);
  const [imgOne, setimgOne] = useState(toEdit.img[0].imgOne);
  const [imgTwo, setimgTwo] = useState(toEdit.img[0].imgTwo);
  const [imgThree, setimgThree] = useState(toEdit.img[0].imgThree);
  const [stocks, setStocks] = useState(toEdit.stock);
  const [description, setDescription] = useState(toEdit.description);

  const editProduct =async(e)=>{
    e.preventDefault()

    try {
        const env = import.meta.env;
        const uri = env.VITE_REACT_SERVER_URL

        const editedImg = {
          imgOne:imgOne,
          imgTwo:imgTwo,
          imgThree:imgThree
        }
      
        const editedProduct = {
            name:productName,
            price:price,
            quantity:quantity,
            category:category,
            img:[editedImg],
            stock:stocks,
            description:description
        }
          await axios.put(`${uri}/product/${id}`, editedProduct)
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            confirmButtonColor:'rgb(67,94,57)'
          });
          navigate('/adminDashboard/products')
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="AddProductForm">
    <div className="AddProductForm-container">
        <h1>Edit product</h1>
        <p>Edit your product here</p>
    </div>
    <div className="AddProductForm-form-container py-3">
        {
          toEdit != undefined ? 
              <form>
                <div className="form-input-container">
                    <div className="input-container">
                            <input type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}} placeholder="Product name"/>
                        <div className="price-input">
                            <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Price"/>
                            /
                            <input type="text" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} placeholder="1kg"/>
                        </div>
                        {/* <input type="text" onChange={(e)=>{setCategory(e.target.value)}} placeholder="Category"/> */}
                        <select name="category" defaultValue={toEdit.category} className="category" onChange={(e) => setCategory(e.target.value)}>
                            <option value="Livestock and Poultry Products">Livestock and Poultry Products</option>
                            <option value="Fish">Fish</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Rice">Rice</option>
                            <option value="Herbs & Spices">Herbs & Spices</option>
                        </select>
                        <input type="number" value={stocks} onChange={(e)=>{setStocks(e.target.value)}} placeholder="Quantity of items in stocks"/>
                    </div>
                    <div className="right-side">
                    <input type="text" value={imgOne} onChange={(e)=>{setimgOne(e.target.value)}} placeholder="Img link one"/>
                        <input type="text" value={imgTwo} onChange={(e)=>{setimgTwo(e.target.value)}} placeholder="Img link two"/>
                        <input type="text" value={imgThree} onChange={(e)=>{setimgThree(e.target.value)}} placeholder="Img link three"/>
                        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Product Desicription"></textarea>
                    </div>
                </div>
                <button  onClick={editProduct} type="submit">Edit product</button>
            </form>
          :
            'Loading...'
        }
    </div>
</div>
  )
}

export default EditProductForm