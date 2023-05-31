import React, { Component } from 'react';
import './index.css'
import WeatherApi from './Components/WeatherApi';
class App extends Component {
  render() { 
    return (
      <>
      <div>
        <WeatherApi></WeatherApi>
      </div>
      </>
    );
  }
}
 
export default App;