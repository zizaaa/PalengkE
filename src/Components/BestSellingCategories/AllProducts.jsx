import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaChevronLeft,FaChevronRight } from 'react-icons/fa'

const AllProducts = (props) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(props.data.filter((item)=> item.bestSeller).length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((nextPage) => nextPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = props.data.filter((item)=> item.bestSeller).slice(startIndex, endIndex);
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  return (
    <section className='allproducts-best-sell'>
        <div className='container product-containers'>
          <div className='flex-container'>
                {/* buttons */}
                  <button type='button' onClick={handlePrevPage} disabled={currentPage === 1} className='left-button'>
                      <FaChevronLeft/>
                  </button>
                  <button type='button' onClick={handleNextPage} disabled={currentPage === totalPages} className='right-button'>
                      <FaChevronRight/>
                  </button>
              {displayedItems.map((item)=>(
                <div className='custom-box' key={item._id}>
                    <div className='img-container'>
                      <img src={item.img}/>
                    </div>
                    <div className='product-info-container'>
                      <h4 className='product-name'>{item.name}</h4>
                      <p className='product-price'>&#8369;{item.price}</p>
                      <button type='button'>Add to cart</button>
                    </div>
                </div>
              ))}
          </div>
          <div className='pagination'>
              {getPageNumbers().map((pageNumber) => (
                  <div key={pageNumber} >
                      <div className={pageNumber === currentPage ? 'activePage' : 'pagination-circle'}>
                      </div>
                  </div>
                ))}
          </div>
        </div>
    </section>
  )
}
AllProducts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default AllProducts