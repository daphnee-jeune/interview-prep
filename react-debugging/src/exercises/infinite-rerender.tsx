import { useState, useEffect, useCallback } from 'react'

const InfiniteRerender = () => {
 const [count, setCount] = useState(0);
 // incorrect
  // const computeNext = () => {
  //   return count + 1;
  // };

 // correct: computeNext changes only when the count state changes
  const computeNext = useCallback(() => {
   return count + 1;
 }, [count]);

  useEffect(() => {
    const next = computeNext(); // function is called
    setCount(next);             // state update triggers render
  }, [computeNext]);            // dependency changes every render

  return <div>{count}</div>;
}

export default InfiniteRerender

// Sympton
// This implementation causes an infinite loop because it first renders => computeNext is new so the effect runs again => effect calls setCount and causes another rerender => new render creates a new computeNext => the cycle repeats
// The component will re-render everytime the computeNext is called. The computeNext is called in the useEffect and it value is assigned to the count state
// Every render creates a new version of the function
// Solution
// Leverage useCallback so the fn identity stays stable unless its deps change