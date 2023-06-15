import { Link } from 'react-router-dom'
import { FaChevronLeft,FaChevronRight } from 'react-icons/fa'
import { useState } from 'react'
import heroImg_1 from '../assets/heroImgs/hero1.png'
import heroImg_2 from '../assets/heroImgs/hero2.png'
import heroImg_3 from '../assets/heroImgs/hero3.png'

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };
  return (
    <section className='hero'>
        <div className="carousel">
            <div className={`slide slide-1 ${activeIndex === 0 ? 'active' : ''}`}>
                <img src={heroImg_1} className='img-fluid slide-1-img'/>
                <Link to='/shop' className='slide-1-btn'>Shop now</Link>
            </div>
                <div className={`slide slide-2 ${activeIndex === 1 ? 'active' : ''}`}>
                <img src={heroImg_2} className='img-fluid'/>
                <Link to='/shop' className='slide-2-btn'>Shop now</Link>
                </div>
            <div className={`slide slide-3 ${activeIndex === 2 ? 'active' : ''}`}>
                <img src={heroImg_3} className='img-fluid'/>
                <Link to='/shop' className='slide-3-btn'>Shop now</Link>
            </div>

            <button className="prev-button" onClick={prevSlide}>
              <FaChevronLeft/>
            </button>
            <button className="next-button" onClick={nextSlide}>
            <FaChevronRight/>
            </button>
      </div>
    </section>
  )
}

export default Hero