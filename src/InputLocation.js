import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  grid-area: b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const Input = styled.input`
  font-family: "Lobster Two", cursive;
  height: 40px;
  border: 3px solid #d49a89;
  border-radius: 10px;
  padding: 10px;
  &:focus {
    outline: none;
  }

  &[type="text"] {
    width: 50%;
    margin-bottom: 10px;
  }

  &[type="submit"] {
    width: 20%;
  }
  @media (min-width: 768px) {
    &[type="text"] {
      width: 30%;
    }
    &[type="submit"] {
      width: 10%;
    }
  }
`;

export default function InputForm(props) {
  const [locationInput, setLocationInput] = useState("");

  function handleLocationInput(e) {
    e.preventDefault();
    props.handleSubmit(locationInput);
  }

  return (
    <Form onSubmit={handleLocationInput}>
      <Input
        type="text"
        placeholder="Location"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        onBlur={(e) => setLocationInput(e.target.value)}
      />
      <Input type="submit" value="Search" />
    </Form>
  );
}
