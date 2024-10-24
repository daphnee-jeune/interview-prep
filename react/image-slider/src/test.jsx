import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const url = "https://dummyjson.com/products";

const test = () => {
  const [products, setProducts] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      const products = data.products((product) => {
        return {
          image: product.image[0],
          name: product.description,
        };
      });
      return products;
    };
    const fetchProducts = async () => {
      const results = await getData();
      setProducts(results.slice(0, 6)); // limit to 6 slides
    };
    fetchProducts();
  }, []);

  const handleNextClick = () => {
    if (!containerRef.current) return;
    let nextIdx = currentIdx + 1;
    if (nextIdx >= products.length) return (nextIdx = 0);
    setCurrentIdx(nextIdx);

    containerRef.current.scrollTo({
      left: nextIdx * 400,
      behavior: "smooth",
    });
  };
  const handlePrevClick = () => {
    if (!containerRef.current) return;
    let nextIdx = currentIdx - 1;
    if (currentIdx === 0) return (nextIdx = products.length - 1);

    setCurrentIdx(nextIdx);

    containerRef.current.scrollTo({
      left: nextIdx * 400,
      behavior: "smooth",
    });
  };
  return (
    <div className="slider">
      <div className="container" ref={containerRef}>
        <div className="wrapper" style={{ width: products.length * 400 }}>
          {products.map((product, idx) => {
            return (
              <div className="slide" key={idx}>
                <img src={product.image} alt={product.name} />
                <br />
                {product.name}
              </div>
            );
          })}
        </div>
        <button className="button nextButton" onClick={handleNextClick}>
          Next
        </button>
        <button className="button prevButton" onClick={handlePrevClick}>
          Previous
        </button>
      </div>
    </div>
  );
};

export default test;
