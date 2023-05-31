import React, { Component } from "react";
import rainy from "../Image/rainy.jpg";
import clear from "../Image/clear.jpg";
import snow from "../Image/snow.jpg";
class WeatherImg extends Component {
  /*I can send the background Image as in icon code or use conditional statement or switch case */
  render() {
    const weatherInfo = this.props.weatherbg.map((weatherinfo, i) => {
      let bgUrl = "";
      if (weatherinfo.temp > 30) {
        bgUrl = clear;
      } else if (weatherinfo.temp > 20 && weatherinfo.temp < 30) {
        bgUrl = rainy;
      } else {
        bgUrl = snow;
      }
      // const imgUrl = `http://openweathermap.org/img/wn/${weatherinfo.weather.icon}@2x.png`;

      return (
        <>
          <div className="text-center">
            <img className="image mt-5" src={bgUrl} alt="" />
          </div>
        </>
      );
    });
    return <div>{weatherInfo}</div>;
  }
}

export default WeatherImg;
