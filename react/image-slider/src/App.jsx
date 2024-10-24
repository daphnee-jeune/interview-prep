import { useState, useEffect, useRef } from "react";
import "./App.css";

const api_endpoint = "https://dummyjson.com/products";

function App() {
  const [products, setProducts] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0); // keep track of curr slide
  const wrapperRef = useRef(null); // to enable smooth scrolling

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(api_endpoint);
      const data = await response.json();
      const products = data.products.map((product) => {
        return {
          image: product.images[0],
          name: product.description,
        };
      });
      return products;
    };
    const fetchResults = async () => {
      const results = await getData();
      setProducts(results.splice(0, 4)); // limit to the first 4 products
    };
    fetchResults();
  }, []);

  const handleNextClick = () => {
    if (!wrapperRef.current) return;
    let nextIdx = currentIdx + 1;
    if (nextIdx >= products.length) return nextIdx = 0; // if currIdx exceeds the length of products, loop back to the first item

    setCurrentIdx(nextIdx); // move to the next product
 
    // smooth scrolling
    wrapperRef.current.scrollTo({
      left: nextIdx * 400, // assuming each item is 400px wide
      behavior: "smooth",
    });
  };

  const handlePrevClick = () => {
    if (!wrapperRef.current) return;
    let nextIdx = currentIdx - 1;
    if (currentIdx === 0) {
      nextIdx = products.length - 1; // loop back to the last item.
    };

    setCurrentIdx(nextIdx);

    wrapperRef.current.scrollTo({
      left: nextIdx * 400, // assuming each item is 400px wide
      behavior: "smooth",
    });
  };
  return (
    <div className="slider">
      <div className="container" ref={wrapperRef}>
        {/* The inline styling sets each individual slide to be 400px for the whole slider */}
        <div className="wrapper" style={{ width: products.length * 400 }}> 
          {products.map((product, idx) => (
            <div className="slide" key={idx}>
              <img src={product.image} alt={product.name} />
              <br />
              {product.name}
            </div>
          ))}
        </div>
      </div>
      <button className="nextButton button" onClick={handleNextClick}>
        Next
      </button>
      <button className="prevButton button" onClick={handlePrevClick}>
        Previous
      </button>
    </div>
  );
}

export default App;
