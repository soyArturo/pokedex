import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/ThemeContext";

import Moon from "../../assets/img/moon.png";
import Sun from "../../assets/img/sun.png";

const ToggleButton = styled.button`
  padding: 1rem;
  border: none;
  outline: none;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: none;
  color: #222;

  &:hover {
    transition: all 0.2s ease-in-out;
  }
`;

const ThemeImage = styled.img`
  max-width: 40px;
`;

const Toggle = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const handleToggle = () => {
    if (darkMode) theme.dispatch({ type: "LIGHTMODE" });
    else theme.dispatch({ type: "DARKMODE" });
  };

  return (
    <>
      <ToggleButton onClick={handleToggle}>
        <ThemeImage src={darkMode ? `${Sun}` : `${Moon}`} />
      </ToggleButton>
    </>
  );
};

export default Toggle;
