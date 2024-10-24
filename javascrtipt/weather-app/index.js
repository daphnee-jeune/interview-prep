document
  .getElementById("getWeatherButton")
  .addEventListener("click", function () {
    const city = document.getElementById("cityInput").value;
    if (city) {
      getWeather(city);
    } else {
      alert("Please enter a city name");
    }
  });

const getWeather = (city) => {
  const apiKey = "api key";
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl).then(res => res.json()).then(data => {
    if(data.cod === 200) {
        const weatherInfo = document.getElementById("weatherInfo");
        weatherInfo.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Description: ${data.weather[0].description}</p>
        `;
    } else {
        alert("City not found");
    }
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
    alert("Error fetching weather data");
  })
};
