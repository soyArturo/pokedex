import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "../../context/ThemeContext";
import Pokeball from "../../assets/img/pokeball.svg";

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${(props) => (props.light ? "#222" : "#fff")};
  font-size: 2rem;

  & > img {
    animation: spin 1s linear infinite;

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

const Loader = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <Loading light={!darkMode}>
      <img src={Pokeball} alt="" srcset="" />
      Catching 'em all...
    </Loading>
  );
};

export default Loader;
