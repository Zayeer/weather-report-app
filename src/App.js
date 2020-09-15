import React, { useState, useEffect } from "react";
import InputForm from "./InputLocation";
import DisplayData from "./DisplayData";
import styled from "styled-components";
import "./App.css";

function day(weekNum) {
  // eslint-disable-next-line default-case
  switch (weekNum) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
  }
}
const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "a"
    "b"
    "c";
  height: 100vh;
  width: 100vw;
  grid-gap: 20px;
  background-color: #ecf4f3;
  color: #5b6dcd;
  font-family: "Lobster Two", cursive;
`;
const MainHeading = styled.h1`
  font-family: "Alfa Slab One", cursive;
  font-size: 1.5em;
  grid-area: a;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

function App() {
  /*responseArr - holds the entire response data from the request incase
    if I want to display more data in the future.*/
  const [responseArr, updateResponseArr] = useState(null);
  const [locAvail, updateLocAvail] = useState(true); //locAvail - check for location availability.
  const [place, setPlace] = useState(""); //place - holds the city name from the response data.
  const [loc, setLoc] = useState("");
  const [fiveDays, updateFiveDays] = useState(null);
  useEffect(() => {
    async function getWeatherData(city) {
      if (typeof city === "string") {
        const url = `${
          Location.protocol || "https:"
        }//api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=f481182c63cfe95ca3bec984a6378f17`;
        const response = await fetch(url);
        const data = await response.json();
        setPlace(data.city.name);
        return data.list;
      } else {
        const url = `${
          Location.protocol || "https:"
        }//api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${
          city.long
        }&units=imperial&appid=f481182c63cfe95ca3bec984a6378f17`;
        const response = await fetch(url);
        const data = await response.json();
        setPlace(data.city.name);
        return data.list;
      }
    }

    /*if there is no location in the loc variable(which holds the location input provided by user),
      then display data according to geolocation*/
    if (!loc) {
      if (!navigator.geolocation) {
        err();
      } else {
        navigator.geolocation.watchPosition(success, err);
      }
      function success(pos) {
        const coords = pos.coords;
        getWeatherData({
          lat: coords.latitude,
          long: coords.longitude,
        }).then((data) => {
          updateLocAvail(true);
          updateData(data);
        });
      }

      function err() {
        getWeatherData("new delhi").then((data) => {
          updateLocAvail(true);
          updateData(data);
        });
      }
    } else {
      getWeatherData(loc)
        .then((data) => {
          updateLocAvail(true);
          updateData(data);
        })
        .catch(() => {
          updateLocAvail(false);
        });
    }
  }, [loc]);

  function updateData(resData) {
    updateResponseArr((resData) => resData);

    //filter five days response data according to the desired time
    const filteredData = resData.filter((val) =>
      val.dt_txt.includes("18:00:00")
    );

    updateFiveDays(() => filterFiveDaysDisplayData(filteredData));
  }

  //return all the five days data each as an object, i.e. five objects inside an array
  function filterFiveDaysDisplayData(val) {
    const fiveDaysData = [];
    val.forEach((data) =>
      fiveDaysData.push({
        dayOfWeek: day(
          new Date(data.dt_txt.slice(0, data.dt_txt.indexOf(" "))).getDay()
        ),
        temp: data.main.temp,
        desc: data.weather[0].description,
        img: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      })
    );
    return fiveDaysData;
  }

  function handleInputSubmit(newLoc) {
    setLoc(newLoc);
  }

  return (
    <Main>
      <MainHeading>WEATHER FORECAST</MainHeading>
      <InputForm handleSubmit={handleInputSubmit} />
      {fiveDays && (
        <DisplayData place={place} fiveDays={fiveDays} locAvail={locAvail} />
      )}
    </Main>
  );
}

export default App;
