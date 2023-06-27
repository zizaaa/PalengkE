import policiesImg from '/src/assets/policiesImg.jpeg'

const WebsitePolicies = () => {
  return (
    <section className="policies-section mb-2">
        <div className="policies-section-container">
                <img src={policiesImg} className='img-fluid'/>
            <div className='content-container'>
                <h1>Website Policy</h1>
                <div className='content'>
                    <h5>
                        Privacy Policy
                    </h5>
                    <p>
                        At Palenk-E, we are commited to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website or make a purchase. By using our website, you agree to the terms and policy.
                    </p>
                </div>
                <div className='content'>
                    <h5>
                        Terms and Conditions
                    </h5>
                    <p>
                        Welcome to Road Treat! These Terms and Conditions govern your use of our website and the products and services we offer. Ny accessing or using our website, you agree to comply with these terms and conditions.
                    </p>
                </div>
                <div className='content'>
                    <h5>
                        Shipping and Delivery
                    </h5>
                    <p>
                        We offer shipping services to deliver your orders to specified address. The estimated delivery time will depend on your location and the shipping method during the checkout. Please take note that delays may occur due to unforeseen circumstances beyond our control.
                    </p>
                </div>
                <div className='content'>
                    <h5>
                        Returns and Refunds
                    </h5>
                    <p>
                        We want you to be completely satisfied with your purchase, If for any reason you are not, we offer a hassle free return and refund policy. Please review our Returns and Refunds policy for detailed information on the process and elegibility.
                    </p>
                </div>
                <div className='content'>
                    <h5>
                        Payment Methods
                    </h5>
                    <p>
                        We accept various payment methods, including credit cards, debit cards, and PayPal. Your payment information is encrypted and securely processed to ensure a safe transaction.
                    </p>
                </div>
                <div className='content'>
                    <h5>
                        Product Descriptions
                    </h5>
                    <p>
                        We strive to provide accurate and detailed product descriptions to help you make informed purchasing decisions. However, please note that slight variations in color, size, or other attribute may occur. We recommend readung product reviews and reaching out our customer team for any specific questions.
                    </p>
                </div>
                <div className='content'>
                    <h5>
                        Intellectual Property
                    </h5>
                    <p>
                        All content on our website, including images, logo, text, and graphics, is protected by intellectual property rights. You may not use, reproduce, or distribute any of our copyrighted materials without prior written consent.
                    </p>
                </div>
                <div className='content'>
                    <h5>Customer Support</h5>
                    <p>
                        Our dedicated customer support team is here to assist you with any inquiries, concerns or issues you may have. Please reach out to us through our contact page, and we will respond to your query as soon as possible.
                    </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default WebsitePolicies