import { Link, Outlet } from "react-router-dom"
import logo from '/src/assets/logo.png'
const Forms = () => {
  return (
    <section className="container">
            <div className="form-nav">
                <div className='img-container'>
                    <Link to='/'>
                        <img src={logo} className='img-fluid'/>
                    </Link>
                </div>
            </div>
        <Outlet/>
    </section>
  )
}

export default Forms