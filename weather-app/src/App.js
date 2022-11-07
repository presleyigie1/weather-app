import React, { useState } from 'react'
import axios from 'axios'

function App() {
  {/*set empty objects */}
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')
 
  {/*api open weather */}
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7e90a95bc92bd67be10ab342446813ab`

  {/* request http/ grab url, if "enter" is pressed submit input */}
  const searchLocation = (e) => {
    if(e.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }



 

  return (
    <div className="app">
      <div className="search">
        <button><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></button>
        <input  value={location} onChange={event =>setLocation(event.target.value)} onKeyPress={searchLocation} placeholder="Enter a City"/>
      </div>
      <div className="contain">
        <div className="weather">
            <div className="location">
            {/*check if parent element available if so, display otherwise return null*/}
             {data.sys ? <h1 className="cName">{`${data.name}, ${data.sys.country}`}</h1> :null}
           </div>
            {/*if main exists show temp from mai
            round the number */}
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> :null}
            </div>
            <div className='desc'>
              {data.weather ? <p>{data.weather[0].description}</p> :null}
            </div>
            
            {/*hide the p tag of wind and humidity if there is no city*/}
          {data.name != undefined &&
            <div>
              <div className="humidity">
                {data.main ? <p className="humidityAmt">{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className="windAmt">{data.wind.speed.toFixed()*3.6.toFixed()} KM/H</p>: null}
                <p>Wind Speed</p>
              </div>
            </div>
          }
          {/*tell the  user to enter city */}
          {data.name == undefined &&
            <div>
              <p className="prompt"><em>Enter a Location Above to See Weather</em> </p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
