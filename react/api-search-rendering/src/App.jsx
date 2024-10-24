import { useState, useEffect } from "react";
import Product from "./Product";
import "./App.css";

const url = "https://dummyjson.com/products";

const App = () => {
  const [products, setProducts] = useState([]); // State for storing the list of all products
  const [selectedImage, setSelectedImage] = useState(""); // State for the currently selected image
  const [searchVal, setSearchVal] = useState(""); // State for the search input value
  const [filteredResults, setFilteredResults] = useState([]); // State for the filtered list of products

  useEffect(() => {
    // Fetches product data from the API on component mount
    const fetchResults = async () => {
      const results = await fetch(url);
      const json = await results.json();
      setProducts(json.products);
      setFilteredResults(json.products);
      setSelectedImage(json.products[0].images[0]); // Sets the first image as the selected image by default
    };
    fetchResults();
  }, []);

  const onProductClick = (product) => {
    // Updates the selected image when a product is clicked
    setSelectedImage(product.images[0]);
  };

  const handleSearch = (e) => {
    // Updates the search value and filters the product list based on the search input
    const val = e.target.value;
    setSearchVal(val);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <div style={{ width: 500, margin: "0 auto" }}>
      <div style={{ width: "100%" }}>
        <img
          src={selectedImage}
          alt="Selected Product"
          style={{ width: "100%", height: 200 }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <input
          type="text"
          placeholder="Search"
          value={searchVal}
          onChange={handleSearch}
        />
      </div>

      <div style={{ width: "100%" }}>
        {filteredResults.map((product, idx) => (
          <Product
            key={idx}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
