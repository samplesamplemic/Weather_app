import React, { useState, Component, useEffect } from 'react';
import './App.css';
import { Datew } from './components/date.js';
import rainIcon from './assets/rainy-6.svg';
import cloudIcon from './assets/cloudy.svg'
import clearIcon from './assets/day.svg';
import sunBg from './assets/bg-desktop-clear.jpg';
import rainBg from './assets/bg-rainy.jpg';
import cloudBg from './assets/bg-desktop-cloudy2.jpg';
import searchIcon from './assets/search_icon.png';


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=a12529253e4a2e532ad26ff9186352fc`;

  //search location
  const handleCity = (event) => {

    if (event.key === 'Enter' || event.target.className === 'search-icon') {
      console.log(event);
      async function getData() {
        const response = await fetch(url)
        const data = await response.json()
        //console.log(data)
        setData(data);
      };
      getData();
      images();
      setLocation('');
    }
  };

  //weather details
  function option() {
    if (data.main) {
      const options =
        <>
          <div>Condition<span>{`${data.weather[0].description}`}</span></div>
          <div>Humidity <span>{`${data.main.humidity}%`}</span> </div>
          <div>Wind<span>{`${(+data.wind.speed * 3.6).toFixed()}km/h`}</span></div>
        </>;
      return options;
    }
  };

  //change bg-image according to weather condition
  function images() {
    if (data.main) {
      const icon = data.weather[0].main;
      console.log(icon);
      if (icon === 'Clear') {
        document.body.style.backgroundImage = `url(${sunBg})`;
        document.querySelector('.rain-icon').setAttribute('src', `${clearIcon}`);
        //document.querySelector('.side-menu').style.background = 'linear-gradient(0deg, rgba(66,75,90, 0.2) 27%, rgba(123,152,162,1) 100%)';
      }
      else if (icon === 'Clouds') {
        document.body.style.backgroundImage = `url(${cloudBg})`;
        document.querySelector('.rain-icon').setAttribute('src', `${cloudIcon}`);
      } else if (icon === 'Rain' || icon === 'Drizzle' || icon === 'Thunderstorm') {
        document.body.style.backgroundImage = `url(${rainBg})`;
        document.querySelector('.rain-icon').setAttribute('src', `${rainIcon}`);
      }
    } else {
      return null;
    }
  };
  images();

  //set Local Storage
  useEffect(() => {
    if (data.main) {
      localStorage.setItem('data', JSON.stringify(data));
    }
  });

  //get Local Storage and create div of past searched location
  const dat = localStorage.getItem('data');
  const getLocal = () => {
    if (dat !== null) {
      const dat2 = JSON.parse(dat)
      const dat3 =
        <div className="get-local">{`${dat2.name}`}</div>;
      return dat3;
    }
  };

  return (
    <>
      <div className="container flex-row">
        <div className="information flex-row">
          {data.main ? <div className="temp">{`${data.main.temp.toFixed()}°`}</div> : null}
          <div className="flex-column">
            {data.main ? <div className="location">{`${data.name}`}</div> : null}
            <Datew />
          </div>

          <div id="icon">
            <img alt="" className="rain-icon" />
          </div>
        </div>
        <div className="side-menu">
          <div className="flex-row">
            <input type="text" value={location}
              id='location'
              placeholder='Enter location'
              onChange={event => setLocation(event.target.value)}
              onKeyPress={handleCity}
            />
            <span><img src={searchIcon} alt="" className="search-icon"
              onClick={handleCity}
              onChange={event => setLocation(event.target.value)}
            /></span></div>
          <div className="weather-details">
            <div><p>Weather Details</p></div>
            {option()}
          </div>
          {getLocal()}
        </div>
      </div>
    </>
  );
}

export default App;