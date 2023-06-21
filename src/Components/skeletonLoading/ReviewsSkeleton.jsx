import { SkeletonTheme } from "react-loading-skeleton"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const ReviewsSkeleton = () => {
  return (
    <SkeletonTheme  baseColor="#c5c5c5" highlightColor="#a6a6a6">
        <div className="reviews-skeletom-card">
            <div className="reviews-header-skeleton">
                <div className="left-skeleton">
                    <Skeleton style={{width:"8rem"}}/>
                </div>
                <div className="right-skeleton">
                    <Skeleton style={{width:"8rem"}}/>
                </div>
            </div>
            <div className="reviews-center-skeleton my-3">
                <Skeleton style={{width:"10rem"}}/>
            </div>
            <div className="reviews-bottom-skeleton">
                <div className="message-skeleton">
                    <Skeleton style={{width:"100%"}}/>
                    <Skeleton style={{width:"80%"}}/>
                    <Skeleton style={{width:"90%"}}/>
                </div>
                <div className="name-skeleton mt-4">
                    <Skeleton style={{width:"20%"}}/>
                </div>
            </div>
        </div>
    </SkeletonTheme>
  )
}

export default ReviewsSkeleton