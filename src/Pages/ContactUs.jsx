import { useRef } from "react"
import emailjs from '@emailjs/browser';

const ContactUs = () => {
    const form = useRef()

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm(
        'service_n6wnz4k', 
        'template_meynnlb', 
        form.current, 
        'AkpEKEu6sSEUZRhK6')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        }
        );
        e.target.reset();
    };
  return (
    <section>
      <div className="contactUs container">
        <div className="contact info">
          <h2>We're here to help you level up!</h2>
          <h4>We're excited to hear from you and are committed to providing excellent customer service. Whether you have a question, need assistance, or simply want to share your feedback, we're here to help.</h4>

          <div className="contact container">
          <form ref={form} onSubmit={sendEmail}
          className="form-control card flex-center dir-column">
            <input type="text"
            placeholder="Full Name"
            name="user_name" required
            />
            <input type="email"
            placeholder="Email"
            name="user_email" required
            />
            <textarea name="message" cols="30" rows="16"></textarea>
            <button
            type="submit"
            className="btn">Send Message</button>
          </form>
          </div>
        </div>
        <div className="contact img">
        </div>
      </div>
    </section>
  )
}

export default ContactUs
