import { useState } from 'react'
import { FetchUsers } from '../FetchUsers'
import profile from '/src/assets/profileDark.png'
import axios from 'axios'
import Swal from 'sweetalert2';
const Settings = () => {
  const [changePass, setChangePass] = useState('')
  const [newchangePass, setNewchangePass] = useState('')
  const { authorizedUser } = FetchUsers()


  const changePassword = async(e)=>{
    e.preventDefault()

        if(changePass === newchangePass){
            try {
              const env = import.meta.env;
              const URL = env.VITE_REACT_SERVER_URL
      
              await axios.put(`${URL}/user/${authorizedUser._id}`,{
                password:newchangePass
              })
                setChangePass('')
                setNewchangePass('')
                Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  confirmButtonColor:'rgb(67,94,57)'
              });
            } catch (error) {
              console.log(error)
            }
        }else{
          Swal.fire({
              icon: 'error',
              title: 'password not match',
              confirmButtonColor:'rgb(67,94,57)'
          });
        }
  }

  return (
    <div className="settings-sections px-md-5">
        <div className="settings-sections-head">
          <h1>Settings</h1>
          <p>Modify your personal preferences here.</p>
        </div>
        <div className="settings-sections-content">
            <div className="admin-profile">
                <div className="admin-profile-container">
                  <img src={profile}/>
                </div>
                <div className="admin-info-container">
                  <p className='adminName'>{authorizedUser.firstName + ' ' + authorizedUser.lastName}</p>
                  <p>{authorizedUser.userName}</p>
                  <p>{authorizedUser.email}</p>
                </div>
            </div>
            <div className='admin-profile-info mt-3'>
                <div className="admin-profile-info-left">
                  <h3 className='profile-information mb-3'>Profile Information</h3>
                  <p><span>Full Name: </span> {authorizedUser.firstName + ' ' + authorizedUser.lastName}</p>
                  <p><span>Username: </span> {authorizedUser.userName}</p>
                  <p><span>Email address: </span> {authorizedUser.email}</p>
                  <p><span>Phone: </span> {authorizedUser.number}</p>
                  <p><span>Address: </span> {authorizedUser.address}</p>
                </div>
                <div className="admin-profile-info-right">
                    <form>
                        <h3 className='mb-3'>Change password</h3>
                        <input type='password' value={changePass} onChange={(e)=>{setChangePass(e.target.value)}} placeholder='New Password' required/>
                        <input type='password' value={newchangePass} onChange={(e)=>{setNewchangePass(e.target.value)}} placeholder='Confirm New Passwod' required/>
                        <button onClick={(e)=>{changePassword(e)}} type='submit'>Change</button>
                    </form>
                </div>
            </div>
            <div className='coming-soon'>
                <h3>More features comming soon.</h3>
            </div>
        </div>
    </div>
  )
}

export default Settings