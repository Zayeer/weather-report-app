import React from "react";
import styled from "styled-components";

export default function WeatherData(props) {
  const Data = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 3fr;
    justify-self: center;
    text-align: center;
    justify-content: center;
    align-items: center;
    border: 1px solid #e3dfc8;
    border-radius: 5px;
    padding: 50px;
    background-color: rgb(
      ${Math.random() * 255},
      ${Math.random() * 255},
      ${Math.random() * 255}
    );
    color: #000;
    height: 300px;
    font-size: 1.5em;
    box-shadow: 10px 5px 18px
      rgb(
        ${Math.random() * 255},
        ${Math.random() * 255},
        ${Math.random() * 255}
      );
  `;

  const WeatherImage = styled.img`
    justify-self: center;
  `;
  return (
    <Data>
      <h3>{props.day}</h3>
      <WeatherImage src={props.image} alt={props.desc} />
      <h1>{props.temp}</h1>
    </Data>
  );
}
