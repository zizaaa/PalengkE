import { Outlet } from "react-router-dom"

const Products = () => {
  return (
    <section className="px-5 admin-product-section">
      <div className="product-container">
          <Outlet/>
      </div>
    </section>
  )
}

export default Products