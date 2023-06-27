import contactImg from '/src/assets/contactImg.jpeg'

const ContactUs = () => {

  return (
    <section className="contactUs-section">
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
                  required
                  />
                  <input type="email"
                  placeholder="Email"
                  required
                  />
                  <input type="tel"
                  placeholder="Phone number"
                  required
                  />
                  <textarea name="message" placeholder='Message'></textarea>
                  <button
                  type="button">Send Message</button>
                </form>
            </div>
            <div className="d-none d-lg-block img-container">
              <img src={contactImg} className='img-fluid'/>
            </div>
          </div>
      </div>
    </section>
  )
}

export default ContactUs
