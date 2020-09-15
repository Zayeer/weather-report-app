import React from "react";
import styled from "styled-components";
import WeatherData from "./WeatherData";

const ResContainer = styled.div`
  grid-area: c;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  height: 80vh;
`;

const H4 = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  font-size: 1.2em;
  text-align: center;
  color: #ff7e67;
`;
const DataContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(5, 1fr);
  }
  grid-gap: 20px;
  height: 70vh;
`;

const NotFound = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function DisplayData(props) {
  const WData = props.fiveDays.map((day, index) => (
    <WeatherData
      day={day.dayOfWeek}
      temp={day.temp}
      key={index}
      image={day.img}
      desc={day.desc}
    />
  ));
  return (
    <ResContainer>
      {props.locAvail ? (
        <React.Fragment>
          {" "}
          <H4>{props.place}'s five days weather forecast </H4>
          <DataContainer>{WData}</DataContainer>{" "}
        </React.Fragment>
      ) : (
        <NotFound> NOT FOUND </NotFound>
      )}
    </ResContainer>
  );
}
