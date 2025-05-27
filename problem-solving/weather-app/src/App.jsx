import { useState } from "react";
import "./App.css";

// const weatherData = [
//   {
//     id: 0,
//     city: "New York",
//     current: {
//       temp: 72,
//       condition: "Sunny",
//       icon: "sun",
//       wind: 5,
//       humidity: 45,
//       visibility: 10,
//     },
//     forecast: [
//       { day: "Mon", temp: 75, condition: "Sunny", icon: "sun" },
//       { day: "Tue", temp: 78, condition: "Partly Cloudy", icon: "cloud" },
//       { day: "Wed", temp: 68, condition: "Rain", icon: "rain" },
//       { day: "Thu", temp: 65, condition: "Rain", icon: "rain" },
//       { day: "Fri", temp: 70, condition: "Cloudy", icon: "cloud" },
//     ],
//   },
//   {
//     id: 1,
//     city: "London",
//     current: {
//       temp: 58,
//       condition: "Cloudy",
//       icon: "cloud",
//       wind: 12,
//       humidity: 78,
//       visibility: 5,
//     },
//     forecast: [
//       { day: "Mon", temp: 56, condition: "Cloudy", icon: "cloud" },
//       { day: "Tue", temp: 54, condition: "Rain", icon: "rain" },
//       { day: "Wed", temp: 52, condition: "Rain", icon: "rain" },
//       { day: "Thu", temp: 55, condition: "Cloudy", icon: "cloud" },
//       { day: "Fri", temp: 57, condition: "Partly Cloudy", icon: "cloud" },
//     ],
//   },
//   {
//     id: 2,
//     city: "Tokyo",
//     current: {
//       temp: 82,
//       condition: "Sunny",
//       icon: "sun",
//       wind: 7,
//       humidity: 65,
//       visibility: 8,
//     },
//     forecast: [
//       { day: "Mon", temp: 84, condition: "Sunny", icon: "sun" },
//       { day: "Tue", temp: 83, condition: "Sunny", icon: "sun" },
//       { day: "Wed", temp: 80, condition: "Cloudy", icon: "cloud" },
//       { day: "Thu", temp: 79, condition: "Rain", icon: "rain" },
//       { day: "Fri", temp: 81, condition: "Cloudy", icon: "cloud" },
//     ],
//   },
//   {
//     id: 3,
//     city: "Sydney",
//     current: {
//       temp: 75,
//       condition: "Partly Cloudy",
//       icon: "cloud",
//       wind: 10,
//       humidity: 60,
//       visibility: 12,
//     },
//     forecast: [
//       { day: "Mon", temp: 76, condition: "Sunny", icon: "sun" },
//       { day: "Tue", temp: 78, condition: "Sunny", icon: "sun" },
//       { day: "Wed", temp: 74, condition: "Partly Cloudy", icon: "cloud" },
//       { day: "Thu", temp: 72, condition: "Rain", icon: "rain" },
//       { day: "Fri", temp: 70, condition: "Rain", icon: "rain" },
//     ],
//   },
//   {
//     id: 4,
//     city: "Paris",
//     current: {
//       temp: 65,
//       condition: "Rain",
//       icon: "rain",
//       wind: 8,
//       humidity: 82,
//       visibility: 6,
//     },
//     forecast: [
//       { day: "Mon", temp: 63, condition: "Rain", icon: "rain" },
//       { day: "Tue", temp: 64, condition: "Cloudy", icon: "cloud" },
//       { day: "Wed", temp: 68, condition: "Partly Cloudy", icon: "cloud" },
//       { day: "Thu", temp: 70, condition: "Sunny", icon: "sun" },
//       { day: "Fri", temp: 72, condition: "Sunny", icon: "sun" },
//     ],
//   },
// ];

const mockWeatherData = {
  "New York": { temperature: "22°C", humidity: "56%", windSpeed: "15 km/h" },
  "Los Angeles": { temperature: "27°C", humidity: "45%", windSpeed: "10 km/h" },
  "London": { temperature: "15°C", humidity: "70%", windSpeed: "20 km/h" },
};

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    temperature: "",
    humidity: "",
    windSpeed: "",
  });
  const [message, setMessage] = useState("");

  const findMatchedCity = (input) => {
    return Object.keys(mockWeatherData).find(
      (key) => key.toLowerCase() === input.toLowerCase()
    );
  };

  const handleClick = () => {
    const matchedCity = findMatchedCity(input);
    if (matchedCity) {
      setWeather(mockWeatherData[matchedCity]);
      setMessage("");
    } else {
      setMessage("City not found");
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="enter a city"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleClick}>Search</button>
      {message ? (
        <p>{message}</p>
      ) : (
        <>
          <p>Temperature: {weather.temperature} </p>
          <p>Humidity: {weather.humidity}</p>
          <p>Wind: {weather.windSpeed}</p>
        </>
      )}
    </>
  );
}

export default App;
