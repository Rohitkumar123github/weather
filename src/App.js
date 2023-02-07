import axios from "axios";
import { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [data, setData] = useState({});

  const [location, setLocation] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1b83889cd6e87a08bc35adfe76c306ca`;
  const URL1 = `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=1b83889cd6e87a08bc35adfe76c306ca`

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      await axios.get(URL).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
      //after searching for a location, reset value to empty string
      setLocation("");
    }
  };

  useEffect(() => {
    
    const intial = async() =>{
      await axios.get(URL1).then((res) => 
      {
          console.log(res.data);
          setData(res.data);
      })};
        intial();
        // searchLocation();
        console.log({location})
        console.log("useEFFECT 1")

  },[])

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          placeholder="Enter Location..."
          onKeyDown={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p className="bold">{data.name}</p>
          </div>
          <div className="temp">
            {/* without this conditiondal check the app will collapse */}
            {data.main ? (
              <h1 className="bold">
                {(data.main.temp - 273.15).toFixed(2)} °C
              </h1>
            ) : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">
                {(data.main.feels_like - 273.15).toFixed(2)} °C
              </p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.main ? <p className="bold">{(data.wind.speed*1.60934).toFixed(2)}kmH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
