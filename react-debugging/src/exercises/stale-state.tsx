import { useState, useRef, useEffect } from 'react'

const Counter = () => {
 const [count, setCount] = useState(0)
 const handleAlert = () => {
  setTimeout(() => {
   alert("Count is: " + count)
  }, 2000)
 }
  return (
    <div>
      <p>Counter: {count}</p>
      {/* Wrong */}
      {/* <button onClick={() => setCount(count + 1)}>Increment</button> */}
      {/* Right */}
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      <button onClick={handleAlert}>Show alert in 2s</button>
    </div>
  )
}

export default Counter

// What's wrong with this code?
// The wrong approach is dong a direct state read which leads to a stale closure; meaning the state value displayed is captured during a previous render, so the handler risks operating on stale data
// The fix is to update state in a functional way, so that it uses the freshest state value: setState(prevValue => prevValue + 1)
// More importantly, if the current value is needed later, use a ref. It always reflects latest state because here, it's updated in a useEffect. The timeout reads the ref, not the closed-over count value

const CorrectCounter = () => {
 const [count, setCount] = useState(0)
 const countRef = useRef(count)

 // keep ref in sync with state
 useEffect(() => {
  countRef.current = count
 }, [count])

 const handleAlert = () => {
  setTimeout(() => {
   alert("Count is: " + countRef.current)
  }, 2000)
 }
 return (
  <div>
   <p>Count: {count}</p>
   <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
   <button onClick={handleAlert}>Show alert in 2s</button>
  </div>
 )
}