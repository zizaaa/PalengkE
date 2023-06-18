import PropTypes from 'prop-types';
import BestSellingProduct from "../Components/BestSellingProduct"
import Hero from "../Components/Hero"
import Reviews from "../Components/Reviews"

const Home = (props) => {
  const data = props.data;
  const authorizedUser = props.authorizedUser

  return (
    <section>
        <Hero/>
          <BestSellingProduct data={data} authorizedUser={authorizedUser}/>
          <Reviews/>
    </section>
  )
}

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  authorizedUser: PropTypes.object,
  // fetchUserData: PropTypes.func,
};
export default Home