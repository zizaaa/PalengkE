import { Outlet } from "react-router-dom"
import BestSellingProduct from "../Components/BestSellingProduct"
import Hero from "../Components/Hero"

const Home = () => {
  return (
    <section>
        <Hero/>
          <BestSellingProduct/>
            <Outlet/>
    </section>
  )
}

export default Home