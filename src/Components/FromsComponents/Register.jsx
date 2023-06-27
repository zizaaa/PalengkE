import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import enter from '/src/assets/enter.png';
import { useState } from 'react';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL;

const Register = () => {
  let isValid = {
    "firstName":false,
    "lastName":false,
    "userName":false,
    "email":false,
    "password":false,
    "confirmPassword":false,
    "number":false,
    "address":false
  }

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading,setIsLoading] = useState(false)

  const SwalE = withReactContent(Swal);

  const checkNewUser = async () => {
    try {
      const { data } = await axios.get(`${URL}/users`);
        let saveUser = true;
        data.map((user) => {
          if (user.userName === userName) {
              SwalE.fire({
                icon: 'error',
                text: `Username ${userName} already exist`,
                confirmButtonColor: "#435e39",
              });
              setIsLoading(false)
              saveUser=false;
          }
        });
        if(saveUser){  
          setIsLoading(true)          
          addUser();
        }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error}`,
      })
      setIsLoading(false)
    }

  };

  const addUser = async () => {
    try {
      const model = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
        number: number,
        address: address
      };
      await axios.post(`${URL}/users`, model);
    } catch (error) {
      SwalE.fire({
        icon: 'error',
        title: `${error}`,
        confirmButtonColor: "#435e39",
      });
    }

    try {
      const { data } = await axios.get(`${URL}/users`);
      data.map((user) => {
        console.log(user)
        if (user.userName === userName) {
          sessionStorage.setItem('userId', user._id);
          navigate('/');
          setIsLoading(false)
        }
      });
    } catch (error) {
      SwalE.fire({
        icon: 'error',
        text: `${error}`,
        confirmButtonColor: "#435e39",
      });
    }

  };

  const validation = (e) => {
    e.preventDefault();
    setIsLoading(true)

    const userFirstNameValidation =()=>{
        let wordInName = firstName.split("");
    
        if(wordInName.length >=2){
            isValid.firstName = true;
        }else if(wordInName.length < 2){
            isValid.firstName = false;
        }
    }
        const userLastNameValidation =()=>{
            let wordInName = lastName.split("");
        
            if(wordInName.length >=2){
                isValid.lastName = true;
            }else if(wordInName.length < 2){
                isValid.lastName = false;
            }
            
        }
    const userNameValidation =()=>{
        let wordInName = userName.split("");
    
        if(wordInName.length >=4){
            isValid.userName = true;
        }else if(wordInName.length < 2){
            isValid.userName = false;
        }
        
    }

    const userEmailValidation =()=>{
        let hasSign = /[@.]/.test(email);

        if(hasSign){
            isValid.email = true;
        }else{
            isValid.email = false;
        }
            
    }

        const usernumberValidation =()=>{
            if(number != ''){
                isValid.number= true;
            }else{
              isValid.number= false;
            }
                
        }
    const useraddValidation =()=>{
        if(address != ''){
            isValid.address= true;
        }else{
          isValid.address= false;
        }
            
    }
        const userpassValidation =()=>{
            if(password === confirmPassword){
                isValid.password= true;
                isValid.confirmPassword= true;
            }else{
              isValid.password= false;
              isValid.confirmPassword= false;
            }
                
        }
    userFirstNameValidation();
    userLastNameValidation();
    userNameValidation();
    userEmailValidation();
    userpassValidation();
    usernumberValidation();
    useraddValidation();

    if (isValid.firstName && isValid.lastName && isValid.userName && isValid.email && isValid.password &&isValid.confirmPassword && isValid.number && isValid.address) {
      console.log('validated')
      checkNewUser()
    } else {
      SwalE.fire({
        icon: 'error',
        title: 'Opss...',
        text: 'There\'s an error in your information. Please check the details above.',
        confirmButtonColor: "#435e39",
      });
      setIsLoading(false)
    }
  };

  return (
    <section className='register-section mb-5'>
      <div className="register-form-container">
        <div className='form-head'>
          <div className='img-container'>
            <img src={enter} className='img-fluid' alt='Enter' />
          </div>
          <p>Create Account</p>
        </div>
        <form>
          <input
            type='text'
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First name'
            value={firstName}
            required
          />
          <input
            type='text'
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last name'
            value={lastName}
            required
          />
          <input
            type='text'
            onChange={(e) => setUserName(e.target.value)}
            placeholder='User name'
            value={userName}
            required
          />
          <input
            type='mail'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            value={email}
            required
          />
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            value={password}
            required
          />
          <input
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm password'
            value={confirmPassword}
            required
          />
          <input
            type='text'
            onChange={(e) => setNumber(e.target.value)}
            placeholder='Number'
            value={number}
            required
          />
          <input
            type='text'
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Address'
            value={address}
            required
          />
          <div className="bestSeller-spinner custom-spinner">
            <div className={`${isLoading ? 'spinner-border':'custom-spinner-border'}`} role="status">
                <button onClick={(e)=>{validation(e)}} className={`${isLoading ? 'visually-hidden':'form-btn'}`} type='button' >Register</button>
            </div>
          </div>
        </form>
        <div className='bottom-form'>
          <p>Already have an account?</p>
          <Link to='login'>Login</Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
