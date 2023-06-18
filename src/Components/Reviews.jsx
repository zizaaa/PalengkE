import axios from "axios"
import { useState,useEffect } from "react";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
// import { BsStarFill } from 'react-icons/bs'
import { FaChevronLeft,FaChevronRight } from 'react-icons/fa'
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL

const Reviews = () => {
    const [itemsPerPages, setItemsPerPages] = useState(2)
    window.addEventListener('resize', ()=>{
      if (window.innerWidth <= 1002) {
          setItemsPerPages(1);
      }else{
          setItemsPerPages(2)
      }
    });
    const [reviews, setReviews] = useState([])
    const itemsPerPage = itemsPerPages;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(reviews.length / itemsPerPage);
  
    const handleNextPage = () => {
      setCurrentPage((nextPage) => nextPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = reviews.slice(startIndex, endIndex);
    //star rating
    const maxRating = 5;

    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    useEffect(() => {
        const getOverAllReviews = async()=>{
            try {
                const {data} = await axios.get(`${URL}/overAllReviews`)
                setReviews(data)
            } catch (error) {
                console.log(error)
            }
        }
        getOverAllReviews();
    }, [])

  return (
    <section className="reviews-section mt-5">
        <div className="users-review-head">
            <h1>REVIEWS FROM OUR CUSTOMERS</h1>
            <span className="stars-container">
                <h1><AiOutlineStar/></h1>
                <h1><AiOutlineStar/></h1>
                <h1><AiOutlineStar/></h1>
                <h1><AiOutlineStar/></h1>
                <h1><AiOutlineStar/></h1>
            </span>
        </div>
        <div className="main-container">
            <div className="container users-reviews-container">
                {/* BUTTONS */}
                    <button type="button" className="button-left" onClick={ handlePrevPage} disabled={currentPage === 1}>
                        <FaChevronLeft/>
                    </button>
                    <button type="button" className="button-right" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <FaChevronRight/>
                    </button>
                {displayedItems.map((review)=>(
                    <div className="reviews" key={review._id}>
                        <div className="date-stars-container">
                            <span className="stars-container">
                                {[...Array(maxRating)].map((_, starIndex) => (
                                    <h4
                                    key={starIndex}
                                    className={starIndex < review.stars ? 'star-filled' : 'star'}
                                    >
                                    {starIndex < review.stars ? <AiFillStar /> : <AiOutlineStar />}
                                    </h4>
                            ))}
                            </span>
                            <span className="date">
                                <p>{review.date}</p>
                            </span>
                        </div>
                            <h4 className="review-title mt-2">
                                {review.title}
                            </h4>
                        <div className="message-username-container">
                            <h5 className="review-message mt-2">
                                {`"${review.message}"`}
                            </h5>
                            <h5 className="user-name mt-2">
                                {review.name}
                            </h5>
                        </div>
                    </div>
                ))}
            </div>
            <div className='review-pagination'>
                {getPageNumbers().map((pageNumber) => (
                    <div key={pageNumber} >
                        <div className={pageNumber === currentPage ? 'review-activePage' : 'pagination-circle-review'}>
                        </div>
                    </div>
                    ))}
            </div>
        </div>
    </section>
  )
}
export default Reviews