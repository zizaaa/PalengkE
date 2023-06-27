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
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isHidePass,setIsHidePass] = useState(true)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${URL}/users`);
      setUsers(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  const login = (e) => {
    e.preventDefault();
    const userFound = users.find((user) => user.userName === userName);
    if (userFound) {
      if (userFound.password === password) {
        console.log('Login successful');
        sessionStorage.setItem('userId', userFound._id);
        navigate('/');
        // location.reload();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Incorrect password`,
          confirmButtonColor: "#435e39",
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Invalid username`,
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
