import axios from "axios"
import { Link, useNavigate} from 'react-router-dom'
import enter from '/src/assets/enter.png'
import { useState } from 'react'
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL

const Register = () => {

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');


  const checkNewUser = async()=>{
      try {
        const {data} = await axios.get(`${URL}/users`)
          await data.filter((user)=>{
            if(userName === user.userName && password === user.password){
              sessionStorage.setItem('userId',user._id)
              navigate('/');
              location.reload()
            }else{
              navigate('/forms/login');
            }
          })
      } catch (error) {
          alert(error)
      }
  }

  const addUser = async()=>{
      try{
        const model = {
          firstName:firstName,
          lastName:lastName,
          userName:userName,
          email:email,
          password:password,
          number:number,
          address:address
        }
        await axios.post(`${URL}/users`,model)
    }catch(error){
      alert(error)
    }
  }

  const validation = (e) =>{
    e.preventDefault();
    addUser();
    checkNewUser();
  }
  return (

    <section className='register-section mb-5'>
          <div className="register-form-container">
              <div className='form-head'>
                  <div className='img-container'>
                    <img src={enter} className='img-fluid'/>
                  </div>
                  <p>Create Account</p>
              </div>
              <form>
                  <input type='text' 
                      onChange={(e)=>{setFirstName(e.target.value)}} 
                          placeholder='First name' 
                              value={firstName} required/>

                  <input type='text' 
                      onChange={(e)=>{setLastName(e.target.value)}} 
                        placeholder='Last name' 
                        value={lastName} required/>
                  
                  <input type='text' 
                      onChange={(e)=>{setUserName(e.target.value)}} 
                          placeholder='User name' 
                            value={userName} required/>

                  <input type='text' 
                      onChange={(e)=>{setEmail(e.target.value)}} 
                          placeholder='Email' 
                            value={email} required/>

                  <input type='text' 
                      onChange={(e)=>{setPassword(e.target.value)}} 
                        placeholder='Password' 
                        value={password} required/>
                  {/* <input type='text' placeholder='Confirm password' required/> */}
                  
                  <input type='text' 
                      onChange={(e)=>{setNumber(e.target.value)}} 
                        placeholder='Number' 
                          value={number} required/>
                  
                  <input type='text' 
                      onChange={(e)=>{setAddress(e.target.value)}} 
                          placeholder='Address' 
                            value={address} required/>
                    <button type='submit' onClick={validation}>Sign Up</button>
              </form>
              <div className='bottom-form'>
                <p>Already have an account?</p>
                <Link to='login'>Login</Link>
              </div>
          </div>
    </section>
  )
}

export default Register