import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock,FaUserAlt,FaEye,FaEyeSlash } from 'react-icons/fa'
import signInImg from '/src/assets/signin.png'
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL;

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isHidePass,setIsHidePass] = useState(true)

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/users`, { userName:userName, password:password })
        sessionStorage.setItem('userId', response.data.user._id);
        response.data.accessToken ? localStorage.setItem('access', response.data.accessToken):''
        Swal.fire({
          icon: 'success',
          title: 'Login succesful',
          confirmButtonColor: "#435e39",
        }).then((result)=>{
          if(result.isConfirmed){
            navigate('/');
            location.reload();
          }
        })
        // navigate('/');
        // location.reload();
      // Handle successful login (e.g., store tokens in local storage, redirect, etc.)
      // console.log(response.data.accessToken)
    } catch (error) {
          Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${error.response.data.message}`,
          confirmButtonColor: "#435e39",
        });
    }
  };

  const showPass =()=> isHidePass ? setIsHidePass(false):setIsHidePass(true)

  return (
    <section>
      <div className='signIn-container'>
        <div className='img-container'>
          <img src={signInImg} className="img-fluid"/>
        </div>
        <div className="Login-form-container">
          <h1 className='title'>Sign In</h1>
          <form>
            <div className='input-container'>
              <span className='icon'>
                <FaUserAlt/>
              </span>
              <input
                type='text'
                onChange={(e) => setUserName(e.target.value)}
                placeholder='User name'
                required
              />
            </div>
            <div className='input-container'>
              <span className='icon'>
                <FaLock/>
              </span>
              <input
                type={`${isHidePass ? 'password':'text'}`}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
              />
              <span onClick={showPass} className='eye icon'>
                {isHidePass ? <FaEye/>:<FaEyeSlash/>}
              </span>
            </div>
            <button type='submit' onClick={login}>Sign In</button>
          </form>
          <div className='bottom-form'>
            <p>Don't have an account yet?</p>
            <Link to='/forms'>Register</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
