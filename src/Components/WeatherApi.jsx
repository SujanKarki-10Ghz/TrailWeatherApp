import React, { Component } from "react";
import axios from "axios";
import WeatherImg from "./WeatherImg";
class WeatherApi extends Component {
  state = {
    location: "Kathmandu",
    country: "",
    Weatherinfo: [],
    errorMessage: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, //sets input value
    });
  };

  componentDidMount() {
    console.log("Mounted");
    let { Weatherinfo } = this.state;
    /*If I call setState() immediately in componentDidMount().
    It will trigger an extra rendering
    but it will happen before the browser updates the screen.
    This guarantees that even though the render() will be called twice in this case,
    the user won’t see the intermediate state. render -> componentDidMount -> render */
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=kathmandu,Nepal}&appid=8d2de98e089f1c28e1a22fc19a24ef04"
      )
      .then((response) => {
        let rise = new Date(
          //given sunrise data is in millisec
          response.data.sys.sunrise * 1000
        ).toLocaleTimeString("en-US", { hour12: true });
        let set = new Date(response.data.sys.sunset * 1000).toLocaleTimeString(
          "en-US",
          { hour12: true }
        );
        let temperature = response.data.main.temp - 273.15; //given in Kelvin, so converted to celsius
        let temperature_max = response.data.main.temp_max - 273.15;
        // if (data !== 0) {
        Weatherinfo.push({
          name: response.data.name,
          humidity: response.data.main.humidity,
          lat: response.data.coord.lat,
          lon: response.data.coord.lon,
          sunrise: rise,
          sunset: set,
          temp: Math.round(temperature * 100) / 100,
          tempMin: Math.round(temperature_max * 100) / 100,
          tempMax: Math.round(temperature_max * 100) / 100,
          clouds: response.data.clouds.all,
          details: response.data.weather[0].description,
          wind: response.data.wind.speed,
          country: response.data.sys.country,
          icon: response.data.weather[0].icon,
        });
        this.setState({
          Weatherinfo,
        });
        // }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errorMessage: "Something went wrong",
          Weatherinfo: [],
        });
      });
  }
  handleSubmit() {
    console.log("clicked");
    let { Weatherinfo } = this.state;
    const city = {
      location: this.state.location,
    };
    const coun = {
      country: this.state.country,
    };
    let api_id = "8d2de98e089f1c28e1a22fc19a24ef04";
    let data = Weatherinfo.findIndex((element) => {
      /*findIndex() method returns index of first element in array if it satisfies condition else returns -1*/
      return element.name === this.state.location;
    });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.location},${coun.country}&appid=${api_id}`
      )
      .then((response) => {
        if (data !== 0) {
          let rise = new Date(
            //given sunrise data is in millisec
            response.data.sys.sunrise * 1000
          ).toLocaleTimeString("en-US", { hour12: true });
          let set = new Date(
            response.data.sys.sunset * 1000
          ).toLocaleTimeString("en-US", { hour12: true });
          let temperature = response.data.main.temp - 273.15; //given in Kelvin, so converted to celsius
          let temperature_max = response.data.main.temp_max - 273.15;
          Weatherinfo.push({
            name: response.data.name,
            humidity: response.data.main.humidity,
            lat: response.data.coord.lat,
            lon: response.data.coord.lon,
            sunrise: rise,
            sunset: set,
            temp: Math.round(temperature * 100) / 100, //rounding off two decimal digit
            tempMin: Math.round(temperature_max * 100) / 100,
            tempMax: Math.round(temperature_max * 100) / 100,
            clouds: response.data.clouds.all,
            details: response.data.weather[0].description,
            wind: response.data.wind.speed,
            country: response.data.sys.country,
            icon: response.data.weather[0].icon,
          });
          this.setState({
            Weatherinfo,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errorMessage: "Something went wrong",
          Weatherinfo: [],
        });
      });
  }
  //possible reason for re-rendering : conditional rendering, adding key as a prop
  render() {
    console.log("@weather", this.state.Weatherinfo);
    return (
      <>
        {this.state.Weatherinfo.length > 0 &&
          this.state.Weatherinfo.map((weatherinfo, id) => {
            const imgUrl = `http://openweathermap.org/img/wn/${weatherinfo.icon}@2x.png`;
            <WeatherImg weatherbg={this.state.Weatherinfo}></WeatherImg>;
            return (
              <>
                <div className="d-flex mt-3 mx-3 flex-wrap">
                  <div className="row flex-grow-1">
                    <div className="col">
                      <h1 key={id} className="fw-bold">
                        {weatherinfo.name}, {weatherinfo.country}
                      </h1>
                      <h4 className="fw-semibold">
                        {new Date().toDateString()}
                      </h4>
                    </div>
                  </div>
                  <div className="row p-2">
                    <div className="col">
                      <label>Country Name:</label>
                      <input
                        type="text"
                        name="location"
                        // value={this.state.location}
                        className="form-control"
                        onChange={(e) => this.handleChange(e)}
                      ></input>
                    </div>
                    <div className="col">
                      <label>City Name:</label>
                      <input
                        type="text"
                        name="location"
                        // value={this.state.location}
                        className="form-control"
                        onChange={(e) => this.handleChange(e)}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mx-3 p-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handleSubmit()}
                  >
                    Get Weather
                  </button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <div className="row">
                    <div className="col">
                      <img className="mx-3" src={imgUrl} alt="" />
                      <h3 className="text-center">{weatherinfo.details}</h3>
                      <h4 className="mx-5">{weatherinfo.temp}°C</h4>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center mx-5 mt-4 flex-wrap">
                  <div className="row">
                    <div className="col">
                      <div className="card shadow mt-3">
                        <div className="card-header bg-info text-white opacity-50">
                          <p>Maxtemp</p>
                        </div>
                        <div className="card-body text-center">
                          <p>{weatherinfo.tempMax}°C</p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card shadow mt-3">
                        <div className="card-header bg-info text-white opacity-50">
                          <p>Mintemp</p>
                        </div>
                        <div className="card-body text-center">
                          <p>{weatherinfo.tempMin}°C</p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card shadow mt-3">
                        <div className="card-header bg-info text-white opacity-50">
                          <p>Longitude</p>
                        </div>
                        <div className="card-body text-center">
                          <p>{weatherinfo.lon}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card shadow mt-3">
                        <div className="card-header bg-info text-white opacity-50">
                          <p>Latitude</p>
                        </div>
                        <div className="card-body text-center">
                          <p>{weatherinfo.lat}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card shadow mt-3">
                        <div className="card-header bg-info text-white opacity-50">
                          <p>Humidity</p>
                        </div>
                        <div className="card-body text-center">
                          <p>{weatherinfo.humidity}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card shadow mt-3">
                        <div className="card-header bg-info text-white opacity-50">
                          <p>Wind</p>
                        </div>
                        <div className="card-body text-center">
                          <p>{weatherinfo.wind}km/hr</p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card shadow mt-3">
                        <div className="card-header bg-info text-white opacity-50">
                          <p>Sunrise</p>
                        </div>
                        <div className="card-body text-center">
                          <p>{weatherinfo.sunrise}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card shadow mt-3">
                        <div className="card-header bg-info text-white opacity-50">
                          <p>Sunset</p>
                        </div>
                        <div className="card-body text-center">
                          <p>{weatherinfo.sunset}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </>
    );
  }
}

export default WeatherApi;
