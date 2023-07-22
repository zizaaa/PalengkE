import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found-section">
      <div className="img-container">
          <img src=""/>
      </div>
      <div className="error-message-container">
        <h1>Page not found!</h1>
          <p>
            Sorry our dev is lazy!
          </p>
        <Link to="/">Go back</Link>
      </div>
    </div>
  )
}

export default NotFound