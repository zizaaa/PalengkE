import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '/src/assets/signup.png'
import { useState } from 'react';
import { FaEye,FaEyeSlash } from 'react-icons/fa'
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
    "address":false,
    "isAgree":false
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
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const [isPassHide, setIsPassHide] = useState(true)
  const [isConfirmPassHide, setIsConfirmPassHide] = useState(true)

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
        console.log('Have a Greet Day!')
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

    const agree =()=>{
      if(isAgree){
        isValid.isAgree = true;
      }else{
        isValid.isAgree = false
      }
    }
    userFirstNameValidation();
    userLastNameValidation();
    userNameValidation();
    userEmailValidation();
    userpassValidation();
    usernumberValidation();
    useraddValidation();
    agree();

    if (isValid.firstName && isValid.lastName && isValid.userName && isValid.email && isValid.password &&isValid.confirmPassword && isValid.number && isValid.address && isValid.isAgree) {
      console.log('validated')
      checkNewUser()
    } else if(!isValid.isAgree){
      SwalE.fire({
        icon: 'error',
        title: 'Opss...',
        text: 'Make sure that the information you type is correct and true',
        confirmButtonColor: "#435e39",
      });
      setIsLoading(false)
    }else{
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
        <div className="singup-container">
          <div className="register-img-container">
            <img src={signupImg} className="img-fluid"/>
          </div>
          <div className="register-form-container">
            <form>
              <div className="name-container user-reg-container">
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
              </div>
              <div className="username-email-container  user-reg-container">
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
              </div>
              <div className="password-container  user-reg-container">
                <span className="pass-container">
                  <input
                    type={isPassHide ? 'password':'text'}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    value={password}
                    required
                  />
                  <span onClick={()=>{isPassHide ? setIsPassHide(false):setIsPassHide(true)}} className="eye-icon">
                    {isPassHide ? <FaEye/>:<FaEyeSlash/>}
                  </span>
                </span>
                <span className="confirm-pass-container">
                  <input
                    type={isConfirmPassHide ? 'password':'text'}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm password'
                    value={confirmPassword}
                    required
                  />
                  <span onClick={()=>{isConfirmPassHide ? setIsConfirmPassHide(false):setIsConfirmPassHide(true)}} className="eye-icon">
                  {isConfirmPassHide ? <FaEye/>:<FaEyeSlash/>}
                  </span>
                </span>
              </div>
              <div className="number-add-container  user-reg-container">
                  <input
                    type='number'
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
              </div>
              <div className="agreed-container">
                <input type="checkbox" checked={isAgree} onChange={()=>{isAgree ? setIsAgree(false):setIsAgree(true)}} required/>
                <p>I agree that all information giver are correct and true.</p>
              </div>
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
        </div>
    </section>
  );
}

export default Register;
