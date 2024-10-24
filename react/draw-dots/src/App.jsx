import { useState } from "react";
import "./App.css";

function App() {
  const [dots, setDots] = useState([]);
  const [cache, setCache] = useState([]);

  const draw = (e) => {
    const { clientX, clientY } = e;
    // Pass in existing dots first
    setDots([...dots, { x: clientX, y: clientY }]);
  };

  const undo = () => {
    if(dots.length > 0) {
      const newDots = [...dots]; // not modify the original arr
      const lastDot = newDots.pop(); // remove and return last el of arr
      Promise.all([setCache([...cache, lastDot]), setDots(newDots)]) // useful for multiple state updates to run simultaneously
    }
  };

  const redo = () => {
    if(cache.length > 0){
      const newCache = [...cache]; // not modify the original arr
      const lastCache = newCache.pop() // remove and return last arr el
      Promise.all([setCache(newCache), setDots(...dots, lastCache)]) // useful for multiple state updates to run simultaneously
  };

  return (
    <div className="App">
      <div id="button-wrapper">
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <div id="click-area" onClick={draw}>
        {/* extract x and y from dot */}
        {dots.map(({ x, y }, i) =>
          <div key={`dot-${i}`} style={{ left: x, top: y }} className="dot" />
        )}
      </div>
    </div>
  );
}}

export default App;
