import { SkeletonTheme } from "react-loading-skeleton"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ProductInfoSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#c5c5c5" highlightColor="#a6a6a6">
    <div className="container skeleton-container my-5">
        <div className="card">
            <div className="head">
                <div className="img-con">
                    <div className="img-display">
                        <Skeleton style={{height: "15rem"}}/>
                    </div>
                    <div className="img-choice">
                        <div className="img_1">
                            <Skeleton style={{minHeight:"6rem"}}/>
                        </div>
                        <div className="img_2">
                            <Skeleton style={{minHeight:"6rem"}}/>
                        </div>
                        <div className="img_3">
                            <Skeleton style={{minHeight:"6rem"}}/>
                        </div>
                    </div>
                </div>
                <div className="text-con">
                    <Skeleton count={3} style={{width:"10rem", marginBottom:"20px"}}/>

                    <div className="description">
                        <Skeleton count={6} style={{width:"100%", marginTop:"20px"}}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="reviews-skeleton mt-5">
            <div className="review-card-skeleton">
                <div className="img-profile"  style={{minHeight:"5rem"}}>
                    <Skeleton circle style={{height:"5rem",width:"5rem", marginRight:"20px"}}/>
                </div>
                <div className="message-container">
                    <div style={{flex:"1"}}><Skeleton count={3} style={{width:"40%"}}/></div>
                </div>
            </div>
            <div className="review-card-skeleton">
                <div className="img-profile"  style={{minHeight:"5rem"}}>
                    <Skeleton circle style={{height:"5rem",width:"5rem", marginRight:"20px"}}/>
                </div>
                <div className="message-container">
                    <div style={{flex:"1"}}><Skeleton count={3} style={{width:"40%"}}/></div>
                </div>
            </div>
        </div>
    </div>
    </SkeletonTheme>
  )
}

export default ProductInfoSkeleton