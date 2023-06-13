import { Outlet } from "react-router-dom"
import BestSellingProduct from "../Components/BestSellingProduct"
import Hero from "../Components/Hero"

const Home = () => {
  return (
    <section>
        <Hero/>
        <BestSellingProduct/>
        <div className="container bestSellCategories-container">
          <Outlet/>
        </div>
    </section>
  )
}

export default Home