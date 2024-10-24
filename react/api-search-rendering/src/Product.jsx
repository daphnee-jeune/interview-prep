import React from "react";

const Product = ({ product, onProductClick }) => {
  const handleClick = () => {
      // Invokes the callback function passed from the parent component when a product is clicked
      onProductClick(product)
  }
  return (
      <div>
          {product.title} {/* Renders the title of the product */}
          <button onClick={handleClick}>Click Me</button> {/* Button to select the product */}
      </div>
  )
}

export default Product;
