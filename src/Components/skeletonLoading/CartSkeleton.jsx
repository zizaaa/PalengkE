import { SkeletonTheme } from "react-loading-skeleton"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CartSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#c5c5c5" highlightColor="#a6a6a6">
        <div className="skeleton-cart-container">
            <div className="skeleton-cart-cards">
                <div className="skeleton-cart-left">
                    <Skeleton style={{minHeight:"7rem"}}/>
                </div>
                <div className="skeleton-cart-right">
                    <Skeleton style={{width:"70%"}}/>
                    <Skeleton style={{width:"50%"}}/>
                    <Skeleton style={{width:"50%"}}/>
                    <Skeleton style={{width:"40%"}}/>
                </div>
            </div>
            <div className="skeleton-cart-cards">
                <div className="skeleton-cart-left">
                    <Skeleton style={{minHeight:"7rem"}}/>
                </div>
                <div className="skeleton-cart-right">
                    <Skeleton style={{width:"70%"}}/>
                    <Skeleton style={{width:"50%"}}/>
                    <Skeleton style={{width:"50%"}}/>
                    <Skeleton style={{width:"40%"}}/>
                </div>
            </div>
            <div className="skeleton-cart-cards">
                <div className="skeleton-cart-left">
                    <Skeleton style={{minHeight:"7rem"}}/>
                </div>
                <div className="skeleton-cart-right">
                    <Skeleton style={{width:"70%"}}/>
                    <Skeleton style={{width:"50%"}}/>
                    <Skeleton style={{width:"50%"}}/>
                    <Skeleton style={{width:"40%"}}/>
                </div>
            </div>
            <div className="skeleton-cart-cards">
                <div className="skeleton-cart-left">
                    <Skeleton style={{minHeight:"7rem"}}/>
                </div>
                <div className="skeleton-cart-right">
                    <Skeleton style={{width:"70%"}}/>
                    <Skeleton style={{width:"50%"}}/>
                    <Skeleton style={{width:"50%"}}/>
                    <Skeleton style={{width:"40%"}}/>
                </div>
            </div>
        </div>
    </SkeletonTheme>
  )
}

export default CartSkeleton