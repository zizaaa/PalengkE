import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import { FaChevronLeft,FaChevronRight } from 'react-icons/fa'

const UpAndLowLandVege = (props) => {
  const [itemsPerPages, setItemsPerPages] = useState(4)
  const itemsPerPage = itemsPerPages;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(props.data.filter((item)=> item.bestSeller && item.category === 'Upland Vegetables' ||item.category === 'Lowland Vegetables').length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((nextPage) => nextPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = props.data.filter((item)=> item.bestSeller && item.category === 'Upland Vegetables' ||item.category === 'Lowland Vegetables').slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  useEffect(() => {
    window.addEventListener('resize', ()=>{
      if (window.innerWidth <= 763) {
          setItemsPerPages(1);
      }else{
        setItemsPerPages(4)
      }
  });
  });
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
UpAndLowLandVege.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default UpAndLowLandVege