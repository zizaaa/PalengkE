import axios from 'axios';
import contactImg from '/src/assets/contact_us.png'
import { useState } from 'react';
import Swal from 'sweetalert2';
const env = import.meta.env;
const URL = env.VITE_REACT_SERVER_URL;

const ContactUs = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage =async(e)=>{
    e.preventDefault()
    setIsLoading(true)
    if(fullName && email && number && message){
      try {
        const model = {
          fullName:fullName,
          email:email,
          number:number,
          message:message,
          read:false
        }
        await axios.post(`${URL}/messages`,model)
          Swal.fire({
            icon: 'success',
            title: 'We received your message!',
            text: 'Thank you for contacting us! We\'ll get back to you as soon as we can. ',
            confirmButtonColor: "#435e39",
          }).then(()=>{
            setFullName('')
            setEmail('')
            setNumber('')
            setMessage('')
            setIsLoading(false)
          })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oppss...',
          // text:`${error.message}`,
          text: 'There\'s an error while sending your message. Please try again later.',
          confirmButtonColor: "#435e39",
        });
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oppss...',
        text: 'Please complete the input filed below!',
        confirmButtonColor: "#435e39",
      });
    }
  }
  return (
    <section className="contactUs-section py-5">
      <div className="container">
          <div className="custom-row">
            <div className="left-side">
                <div className="some-text">
                  <h2>
                      We're here to help you level up!
                  </h2>
                  <p>
                      We're excited to hear from you and are committed to providing excellent customer service. Whether you have a question, need assistance, or simply want to share your feedback, we're here to help.
                  </p>
                </div>
                <form>
                  <input type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e)=>{setFullName(e.target.value)}}
                  required
                  />
                  <input type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                  />
                  <input type="number"
                  placeholder="Phone number"
                  value={number}
                  onChange={(e)=>{setNumber(e.target.value)}}
                  required
                  />
                  <textarea 
                    name="message" 
                    placeholder='Message' 
                    value={message}
                  onChange={(e)=>{setMessage(e.target.value)}}
                    required>
                  </textarea>
                  <div className={`${isLoading ? 'contactUs-spinner-loading':'contactUs-spinner'}`}>
                    <div className={`${isLoading ? 'spinner-border':'custom-spinner-contact'}`} role="status">
                        <button onClick={(e)=>{sendMessage(e)}} className={`${isLoading ? 'visually-hidden':'contact-btn'}`} type='button' >Send Message</button>
                    </div>
                  </div>
                </form>
            </div>
            <div className="img-container">
              <img src={contactImg} className='img-fluid'/>
            </div>
          </div>
      </div>
    </section>
  )
}

export default ContactUs
