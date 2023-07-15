import { Link } from 'react-router-dom'
import banner from '/src/assets/heroImgs/hero_banner.png'

const Hero = () => {

  return (
    <section className='hero'>
        <div className="banner-container">
            <img src={banner}/>
            <Link to='/shop'>Go to Shop</Link>
        </div>
    </section>
  )
}

export default Hero