import React from 'react';


const AboutUs = () => {
  return (
    
    <div className="container">
      <div className="about-us-container">
      <div className="image-wrapper">
        <img
          className="image-fluid"
          src="src\assets\about_us.png"
          alt="About Us"
        />
      </div>
      <div className="content-wrapper">
        <h2 className="about-us-heading">Meet the Team</h2>
        <p className="about-us-description">
        At PalengkE, we believe in the power of nature and its ability to nurture and nourish our bodies. That's why we carefully curate our product range to offer you only the highest quality organic goods. Whether you're searching for fresh produce, pantry staples, personal care items, or eco-friendly household products, we have everything you need to embrace a more organic way of living. <br /> <br />

        We take great pride in partnering with local farmers and suppliers who share our commitment to organic farming practices. By supporting these passionate individuals and small-scale businesses, we contribute to the growth of sustainable agriculture and the preservation of our environment. You can trust that every item on our shelves has been produced with care, without the use of harmful chemicals, pesticides, or GMOs.
        </p>
      </div>
    </div>
    </div>
  )
}

export default AboutUs;