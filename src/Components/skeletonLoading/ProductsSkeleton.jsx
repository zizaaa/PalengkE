import { SkeletonTheme } from "react-loading-skeleton"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductsSkeleton = () => {
  return (
    <SkeletonTheme  baseColor="#c5c5c5" highlightColor="#a6a6a6">
        <div className="products-skeleton-container-cards">
            <div className="skeleton-flex-container">
                <div className="product-skeleton-cards">
                    <div className="skeleton-img-container">
                        <Skeleton style={{minHeight:"10rem"}}/>
                    </div>
                    <div className="skeleton-content-container mt-3">
                        <Skeleton style={{width:"10rem" ,minHeight:"1rem"}} count={3}/>
                    </div>
                    <div className="skeleton-button-container mt-3">
                        <Skeleton style={{minHeight:"3rem"}}/>
                    </div>
                </div>
                <div className="product-skeleton-cards">
                    <div className="skeleton-img-container">
                        <Skeleton style={{minHeight:"10rem"}}/>
                    </div>
                    <div className="skeleton-content-container mt-3">
                        <Skeleton style={{width:"10rem" ,minHeight:"1rem"}} count={3}/>
                    </div>
                    <div className="skeleton-button-container mt-3">
                        <Skeleton style={{minHeight:"3rem"}}/>
                    </div>
                </div>
                <div className="product-skeleton-cards">
                    <div className="skeleton-img-container">
                        <Skeleton style={{minHeight:"10rem"}}/>
                    </div>
                    <div className="skeleton-content-container mt-3">
                        <Skeleton style={{width:"10rem" ,minHeight:"1rem"}} count={3}/>
                    </div>
                    <div className="skeleton-button-container mt-3">
                        <Skeleton style={{minHeight:"3rem"}}/>
                    </div>
                </div>
                <div className="product-skeleton-cards">
                    <div className="skeleton-img-container">
                        <Skeleton style={{minHeight:"10rem"}}/>
                    </div>
                    <div className="skeleton-content-container mt-3">
                        <Skeleton style={{width:"10rem" ,minHeight:"1rem"}} count={3}/>
                    </div>
                    <div className="skeleton-button-container mt-3">
                        <Skeleton style={{minHeight:"3rem"}}/>
                    </div>
                </div>
            </div>
        </div>
    </SkeletonTheme>
  )
}

export default ProductsSkeleton