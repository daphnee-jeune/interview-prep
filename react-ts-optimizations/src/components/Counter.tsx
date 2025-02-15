import { useState, useEffect } from "react";

// Original
const Counter1 = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  return (
    <div>
      <p>Count</p>
      <div onClick={() => setCount(count + 1)}>Increment</div>
    </div>
  );
};

// Optimized
const Counter2 = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <>
      <div>Count</div>
      <button onClick={increment}>Increment</button>
    </>
  );
};

// Leverage the (prev) param when updating values that depend on the previous state value, especially for async tasks
// setCount((prev) => prev + 1) ensures the state update is based on the latest state value

export default { Counter1, Counter2 };
