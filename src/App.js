import React, { useState } from "react";
import GithubCorner from "react-github-corner";

import { Grid } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

/* Style Hook */
const useStyles = makeStyles({
  outerContainer: {
    marginTop: "18vh",
  },

  appContainer: {
    border: "solid grey 2px",
    borderRadius: "8px",
  },

  header: {
    fontSize: "3rem",
    fontWeight: "600",
    letterSpacing: "2px",
    marginBottom: "-15px",
  },

  searchBar: {
    fontSize: "1.5rem",
    border: "solid grey 2px",
    borderRadius: "8px",
    padding: "5px",
  },

  infoBox: {
    border: "solid grey 2px",
    borderRadius: "8px",
    marginBottom: "40px",
    marginLeft: "16px",
    marginRight: "16px",
  },

  location: {
    fontSize: "1.3rem",
    marginTop: "5px",
    fontWeight: "400",
    letterSpacing: "0.5px",
  },

  date: {
    fontSize: "1.5rem",
    marginTop: "8px",
    fontWeight: "400",
    letterSpacing: "0.5px",
  },

  temperature: {
    fontSize: "2.7rem",
    marginTop: "16px",
    fontWeight: "500",
    letterSpacing: "0.7px",
    border: "solid grey 2px",
    borderRadius: "8px",
    marginLeft: "72px",
    marginRight: "72px",
  },

  weather: {
    fontSize: "1.3rem",
    marginTop: "12px",
    fontWeight: "400",
    letterSpacing: "0.5px",
    marginBottom: "-3px",
  },

  humidity: {
    fontSize: "1.3rem",
    marginTop: "7px",
    fontWeight: "400",
    letterSpacing: "0.5px",
    marginBottom: "-3px",
  },

  wind: {
    fontSize: "1.3rem",
    marginTop: "7px",
    fontWeight: "400",
    letterSpacing: "0.5px",
    marginBottom: "10px",
  },
});
/* End of Styles */

const api = {
  key: "17b5a3c107e6267622e6f8b3bf5e50e6",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const classes = useStyles();

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuild = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`;
  };
  return (
    <Container maxWidth="xs" className={classes.outerContainer}>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        direction="column"
        spacing={4}
        className={classes.appContainer}
      >
        <Grid item>
          <Typography align="center" variant="h1" className={classes.header}>
            Weather.io
          </Typography>
        </Grid>
        <Grid item direction="row" className="search-container">
          <InputBase
            id="outlined-search"
            className={classes.searchBar}
            label="Search"
            type="search"
            variant="outlined"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            fullWidth={true}
            placeholder="Search City"
          />
        </Grid>

        {typeof weather.main != "undefined" ? (
          <Grid item className={classes.infoBox}>
            <Grid item className="location-container">
              <Typography
                align="center"
                variant="h3"
                className={classes.location}
              >
                {weather.name}, {weather.sys.country}
              </Typography>
            </Grid>

            <Grid item className="date-container">
              <Typography align="center" variant="h4" className={classes.date}>
                {dateBuild(new Date())}
              </Typography>
            </Grid>

            <Grid item className="weather-container">
              <Typography
                align="center"
                variant="h2"
                className={classes.temperature}
              >
                {Math.round(weather.main.temp)}°F
              </Typography>

              <Typography
                align="center"
                variant="h5"
                className={classes.weather}
              >
                Weather: {weather.weather[0].main}
              </Typography>
              <Typography
                align="center"
                variant="h5"
                className={classes.humidity}
              >
                Humidity: {weather.main.humidity}%
              </Typography>
              <Typography align="center" variant="h5" className={classes.wind}>
                Wind: {Math.round(weather.wind.speed)} mph
              </Typography>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
      <GithubCorner href="#" />
    </Container>
  );
}

export default App;
