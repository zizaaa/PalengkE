import axios from "axios"
import { useState, useEffect } from "react";

export const FetchProduct =() =>{  
    const [data, setData] = useState([]);
    const [isProductLoading,setIsProductLoading] = useState(true)

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const env = import.meta.env;
                const uri = env.VITE_REACT_SERVER_URL
                const {data} = await axios.get(`${uri}/products`);
                setData(data);
                sessionStorage.setItem('data',JSON.stringify(data))
                setIsProductLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[]);

    return {
        data,
        isProductLoading
    }
}