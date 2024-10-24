import { useState, useEffect } from "react";
import "./App.css";
import TrafficLight from "./components/TrafficLight";

function App() {
  const [activeLight, setActiveLight] = useState("red");
  const [direction, setDirection] = useState("down");

  useEffect(() => {
    const interval = setTimeout(() => {
      if (activeLight === "yellow") {
        if (direction === "down") {
          setActiveLight("green");
        } else if (direction === "up") {
          setActiveLight("red");
        }
      } else if (activeLight === "green") {
        if (direction === "down") {
          setDirection("up");
          setActiveLight("yellow");
        } else if (activeLight === "red") {
          setDirection("down");
          setActiveLight("yellow");
        }
      }
    }, 500);
    return () => clearInterval(interval);
  });

  return (
    <div className="appContainer">
      <TrafficLight activeLight={activeLight} />
    </div>
  );
}

export default App;
