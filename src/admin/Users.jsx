import { Outlet } from "react-router-dom"

const Users = () => {
  return (
    <div className="user-sections-holder px-md-5">
        <Outlet/>
    </div>
  )
}

export default Users