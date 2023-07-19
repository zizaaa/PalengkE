// import { Link } from "react-router-dom"
import axios from "axios"
import { FetchUsers } from "../FetchUsers"
import profile from "/src/assets/profileDark.png"
import { FaEdit, FaTrashAlt } from "react-icons/fa"

const UsersList = () => {
    const { users } = FetchUsers()

    const deleteUser = async(id)=>{
        const env = import.meta.env;
        const URL = env.VITE_REACT_SERVER_URL
        try {
            await axios.delete(`${URL}/user/${id}`)
            console.log('deleted')
        } catch (error) {
            console.log(error)
        }
        console.log(id)
    }
    
  return (
    <div className="users-section">
        <div className="user-sec-head">
            <h1>Users</h1>
            <p>View registered users here.</p>
            {/* <Link to="/adminDashboard/users/add">Add</Link> */}
        </div>
        <div className="users-list-holder mt-3 pb-3">
        {
            users.map((user)=>(
                <div key={user._id} className="user-box">
                    <div className="main-user-box">
                        <div className="user-pic-container">
                            <img src={profile}/>
                        </div>
                        <div className="users-infor-container">
                            <p>ID: {user._id}</p>
                            <p>username: {user.userName}</p>
                            <p>name: {user.firstName + '' + user.lastName}</p>
                            <p>Phone: {user.number}</p>
                            <p>Password: {user.password}</p>
                            <p>Address: {user.address}</p>
                            <p>Role: {user.memberShip != undefined ? user.memberShip:"Member"}</p>
                        </div>
                    </div>
                    <div className="button-container">
                        {/* <Link to={`/adminDashboard/users/edit/${user._id}`} className="edit-button">
                            <span className="Icon">
                                <FaEdit/>
                            </span>
                            Edit
                        </Link> */}
                        <button onClick={()=>{deleteUser(user._id)}} className="delete-button">
                            <span className="Icon">
                                <FaTrashAlt/>
                            </span>
                            Delete
                        </button>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default UsersList