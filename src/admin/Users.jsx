import { Outlet } from "react-router-dom"

const Users = () => {
  return (
    <div className="user-sections-holder px-5">
        <Outlet/>
    </div>
  )
}

export default Users