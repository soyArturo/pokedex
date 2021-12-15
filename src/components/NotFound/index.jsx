import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/ThemeContext";
import Nav from "../Nav/Nav";
import Pokeball from "../../assets/img/pokeball.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${(props) => (props.light ? "#f5f5f5" : "#181818")};

  & > h1 {
    font-size: 5rem;
    margin-bottom: 1rem;
    & > img {
      width: 5rem;
      margin-top: 0;
    }
  }
`;

const Index = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  console.log(darkMode);
  return (
    <>
      <Nav />
      <Container light={!darkMode}>
        <h1>
          Error 4
          <img src={Pokeball} alt="Pokeball" />4
        </h1>
        <img
          src="https://c.tenor.com/kjqof9l6gk8AAAAC/pikachu-sad.gif"
          alt=""
        />
      </Container>
    </>
  );
};

export default Index;
