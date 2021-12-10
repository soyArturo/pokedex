import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Moon from "./assets/img/moon.png";
import Sun from "./assets/img/sun.png";
import Pokeball from "./assets/img/pokeball.svg";
import axiosClient from "./config/axios";
import axios from "axios";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.light ? "#f5f5f5" : "#181818")};
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  max-width: 100wv;
  width: 100%;
`;

const Toggle = styled.button`
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
const Logo = styled.img`
  max-width: 50px;
  margin: 1rem;
`;

const Tittle = styled.h1`
  font-size: 3rem;
  color: ${(props) => (!props.light ? "#fff" : "#222")};
`;

const Search = styled.input`
  width: 50%;
  max-width: 50%;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Container = styled.div`
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  justify-items: center;
  max-width: 100wv;
  width: 90%;
  margin: 1rem;
  padding: 1rem;
`;

const Card = styled.div`
  height: 200px;
  width: 150px;
  background-color: #fff;
`;

const App = () => {
  const defaultDarkTheme =
    window.matchMedia?.("(prefers-color-scheme:dark)")?.matches ?? false;
  const [isDarkMode, setDarkMode] = useState(defaultDarkTheme);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsDetails, setPokemonsDetails] = useState([]);
  const handleToggle = () => {
    setDarkMode(!isDarkMode);
    // console.log(isDarkMode);
  };

  const getPokemons = async () => {
    const res = await axiosClient.get("pokemon?limit=151");
    setPokemons(res.data.results);
  };

  const getPokemonsDetails = async (pokemons) => {
    await axios.all(pokemons.map((pokemon) => axiosClient.get(`pokemon/${pokemon.name}/`))).then(
      data => {
        const new_data = data.map(item => item.data);
        console.log(new_data);
        setPokemonsDetails(new_data);
      }
    );
  };

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    getPokemonsDetails(pokemons);
  }, [pokemons]);
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   const prefersDark =
  //     window.matchMedia &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches;
  //   if (savedTheme && ["dark", "light"].includes(savedTheme)) {
  //     setDarkMode(savedTheme);
  //   } else if (prefersDark) {
  //     setDarkMode("dark");
  //   }
  // }, []);
  return (
    <Main light={!isDarkMode ? true : false}>
      <Header>
        <Logo src={Pokeball} alt="Pokeball" />
        <Toggle onClick={handleToggle}>
          <ThemeImage src={!isDarkMode ? `${Sun}` : `${Moon}`} />
        </Toggle>
      </Header>
      <Tittle light={!isDarkMode ? true : false}>Pokedex!</Tittle>
      <Search placeholder="Search..." />
      <Container>
        {pokemonsDetails &&
          pokemonsDetails.map((pokemon, i) => (
            <Card key={pokemon.id}>
              <img src={pokemon.sprites["front_default"]}/>
              {pokemon.name}
            </Card>
          ))}
      </Container>
    </Main>
  );
};

export default App;
