import { Outlet } from "react-router-dom"
import BestSellingProduct from "../Components/BestSellingProduct"
import Hero from "../Components/Hero"
import Category from "../Components/Category"

const Home = () => {
  return (
    <section>
        <Hero/>
        <BestSellingProduct/>
        <div className="container bestSellCategories-container">
          <Outlet/>
        </div>
        <Category/>

    </section>
  )
}

export default Home