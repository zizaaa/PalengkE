import { SkeletonTheme } from "react-loading-skeleton"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const UserProfileSkeleton = () => {
  return (
    <SkeletonTheme  baseColor="#c5c5c5" highlightColor="#a6a6a6">
        <div className="user-skeleton-container mt-4">
            <div className="user-info-skeleton">
                <div className="user-info-skeleton-left">
                    <Skeleton circle style={{minHeight:"10rem",width:"10rem"}}/>
                </div>
                <div className="user-info-skeleton-right">
                    <div style={{width:"100%"}}>
                        <Skeleton style={{width:"70%"}}/>
                        <Skeleton style={{width:"50%"}}/>
                        <Skeleton style={{width:"70%"}}/>
                    </div>
                </div>
            </div>
            <div className="skeleton-account-details">
                <div className="skeleton-account-details-head">
                <Skeleton style={{width:"30%"}}/>
                </div>
                
                <div className="skeleton-account-icons mt-2">
                  <div className="skeleton-account-icon">
                    <Skeleton style={{minHeight:"2rem",width:"70%"}}/>
                    <Skeleton style={{width:"40%"}}/>
                  </div>
                  <div className="skeleton-account-icon">
                    <Skeleton style={{minHeight:"2rem",width:"70%"}}/>
                    <Skeleton style={{width:"40%"}}/>
                  </div>
                  <div className="skeleton-account-icon">
                    <Skeleton style={{minHeight:"2rem",width:"70%"}}/>
                    <Skeleton style={{width:"40%"}}/>
                  </div>
                </div>
            </div>
            <div className="skeleton-account-details">
                <div className="skeleton-account-details-head">
                <Skeleton style={{width:"30%"}}/>
                </div>
                
                <div className="skeleton-account-icons mt-2">
                  <div className="skeleton-account-icon">
                    <Skeleton style={{minHeight:"2rem",width:"70%"}}/>
                    <Skeleton style={{width:"40%"}}/>
                  </div>
                  <div className="skeleton-account-icon">
                    <Skeleton style={{minHeight:"2rem",width:"70%"}}/>
                    <Skeleton style={{width:"40%"}}/>
                  </div>
                  <div className="skeleton-account-icon">
                    <Skeleton style={{minHeight:"2rem",width:"70%"}}/>
                    <Skeleton style={{width:"40%"}}/>
                  </div>
                </div>
            </div>
            <div className="mt-4">
              <Skeleton style={{minHeight:"3rem",width:"100%"}}/>
            </div>
        </div>
    </SkeletonTheme>
  )
}

export default UserProfileSkeleton