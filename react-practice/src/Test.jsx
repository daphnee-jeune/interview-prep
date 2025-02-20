import { useState, useEffect, useCallback } from "react";
import "./App.css";

const api_url = "https://dummyjson.com/products";

function App() {
  const [userInput, setUserInput] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [cache, setCache] = useState({});

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      const filtered = products.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      !filtered.length ? setIsNotFound(true) : setIsNotFound(false);
      setFilteredProducts(filtered);
    }, 300),
    [products]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    // if user input is already in cache, use the cached result
    if (cache.hasOwnProperty(value)) {
      setProducts(cache[value]);
    }
    // update the cache with the new search term and its results
    setCache((prevCache) => ({ ...prevCache, [value]: filteredProducts }));
    console.log(cache);
    debouncedSearch(value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(api_url);
        const data = await response.json();
        const titles = data.products.map((product) => product.title);
        setProducts(titles);
        setFilteredProducts(titles);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <p>Oops, try again</p>;

  return (
    <>
      <input
        type="text"
        placeholder="Search products"
        value={userInput}
        onChange={handleChange}
      />
      <>
        {isNotFound ? (
          <p>Not found</p>
        ) : (
          filteredProducts.map((product) => <li key={product}>{product}</li>)
        )}
      </>
    </>
  );
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export default App;
