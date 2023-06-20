import BestSellingProduct from "../Components/BestSellingProduct"
import Hero from "../Components/Hero"
import Reviews from "../Components/Reviews"
const Home = () => {

  return (
    <section>
        <Hero/>
          <BestSellingProduct />
          <Reviews/>
    </section>
  )
}

export default Home