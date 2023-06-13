import { Link } from 'react-router-dom'
import { AiOutlineSwapRight } from 'react-icons/ai'

const Hero = () => {
  return (
    <section className='hero'>
      <div className='container hero-flex-container'>
          <div className='row hero-content'>
            <div className='col-md-8'>
                <div className='content-container'>
                    <h1 className='hero-text'>
                        Daan sa Sariwang    Panlasa, Tahanan ng mga Piling Produktong Pilipino!
                    </h1>
                      <Link to='' className='hero-button'>
                          Shop Now    
                          <span><AiOutlineSwapRight/></span>
                      </Link>
                </div>
            </div>
          </div>
      </div>
    </section>
  )
}

export default Hero