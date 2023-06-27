import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import profileDark from '/src/assets/profileDark.png';
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL;

const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

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
          showConfirmButton: "true",
          icon: 'success',
          title: 'Login Successfully',
          text: 'Done',
          confirmButtonColor: "#435e39",
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Invalid username or password`,
        confirmButtonColor: "#435e39",
      });
    }
  };

  return (
    <section>
      <div className="Login-form-container">
        <div className='Login-form-head'>
          <div className='img-container'>
            <img src={profileDark} className='img-fluid' alt='Enter' />
          </div>
          <p>Sign In</p>
        </div>
        <form>
          <input
            type='text'
            onChange={(e) => setUserName(e.target.value)}
            placeholder='User name'
            required
          />
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
          <button type='submit' onClick={login}>Sign In</button>
        </form>
        <div className='bottom-form'>
          <p>Don't have an account yet?</p>
          <Link to='/forms'>Register</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
