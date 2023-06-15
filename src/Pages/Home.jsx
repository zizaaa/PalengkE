import { Outlet } from "react-router-dom"
import { useState } from "react"
import BestSellingProduct from "../Components/BestSellingProduct"
import Hero from "../Components/Hero"
import Reviews from "../Components/Reviews"

const Home = () => {
  const [itemsPerPages, setItemsPerPages] = useState(2)
  window.addEventListener('resize', ()=>{
    if (window.innerWidth <= 1002) {
        setItemsPerPages(1);
    }else{
        setItemsPerPages(2)
    }
  });
  return (
    <section>
        <Hero/>
          <BestSellingProduct/>
            <Outlet/>
          <Reviews itemsPerPages={itemsPerPages}/>
    </section>
  )
}

export default Home