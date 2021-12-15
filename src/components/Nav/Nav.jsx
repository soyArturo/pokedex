import React, { useContext } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Toggle from "../Toggle/Toggle";
import { ThemeContext } from "../../context/ThemeContext";
import Pokeball from "../../assets/img/pokeball.svg";
import generations from "../../generations";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  max-width: 100wv;
  width: 100%;
`;

const Logo = styled(Link)`
  & > img {
    width: 50px;
    max-width: 50px;
    margin: 1rem;
  }
`;

const GenerationMenu = styled.nav`
  display: flex;
  align-items: center;
`;

const Generation = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.light ? "#222" : "#fff")};
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  overflow: hidden;
  transition: 0.3s all;

  &:hover {
    font-weight: bold;
    text-decoration: underline;
  }

  &.${props => props.active}{
    font-weight: bolder;
    text-decoration: underline;
  }
`;

const Nav = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <Header>
      <Logo to={"/"}>
        <img src={Pokeball} alt="Pokeball" />
      </Logo>
      <GenerationMenu>
        {generations.map((generation, i) => (
          <Generation
            exact
            key={i}
            to={"/" + generation.link}
            active="active"
            light={!darkMode}
          >
            {generation.text}
          </Generation>
        ))}
      </GenerationMenu>
      <Toggle />
    </Header>
  );
};

export default Nav;
