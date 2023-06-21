import PropTypes from 'prop-types'
import axios from "axios"
import { Link,useNavigate } from "react-router-dom"
import enter from '/src/assets/enter.png'
import { useEffect, useState } from "react"
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL

const Login = () => {
  
  const navigate = useNavigate();
  const[user,setUsers] = useState([])
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  useEffect(()=>{
    fetchUsers();
  },[]);
  const fetchUsers = async()=>{
    try {
        const {data} = await axios.get(`${URL}/users`)
        setUsers(data)
    } catch (error) {
      alert(error)
    }
  }
  const login=(e)=>{
    e.preventDefault();
      user.filter((item)=>{
        if(userName === item.userName && password === item.password){
          console.log('log in successful')
          sessionStorage.setItem('userId',item._id)
          navigate('/');
          location.reload()
        }else if(userName === item.userName && password != item.password){
          console.log('wrong password')
        }else if(userName != item.userName){
          console.log(`No username of ${userName} that registered on our Database!`)
        }
      })
  }
  return (
    <section>
         <div className="Login-form-container">
              <div className='Login-form-head'>
                  <div className='img-container'>
                    <img src={enter} className='img-fluid'/>
                  </div>
                  <p>Create Account</p>
              </div>
              <form>
                  <input type='text' onChange={(e)=>{setUserName(e.target.value)}} placeholder='User name' required/>
                  <input type='text' onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' required/>
                    <button type='submit' onClick={login}>Sign In</button>
              </form>
              <div className='bottom-form'>
                <p>Don't have an account yet?</p>
                <Link to='/forms'>Register</Link>
              </div>
          </div>
    </section>
  )
}

export default Login