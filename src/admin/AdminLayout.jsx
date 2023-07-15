import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div>
        <h1>AdminLayout</h1>

        <div>
            <Outlet/>
        </div>
    </div>

    
  )
}

export default AdminLayout