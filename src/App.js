import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Moon from "./assets/img/moon.png";
import Sun from "./assets/img/sun.png";
import Pokeball from "./assets/img/pokeball.svg";
import { fetchPokemonData, fetchPokemons } from "./config/axios";
import axios from "axios";
import Card from "./components/Card/Card";
import Loader from "./components/Loader/Loader";

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
  margin-top: 0;
  margin-bottom: 1rem;
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
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
  margin: 1rem 0;
  width: 100%;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1920px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const App = () => {
  const defaultDarkTheme =
    window.matchMedia?.("(prefers-color-scheme:dark)")?.matches ?? false;
  const [isDarkMode, setDarkMode] = useState(defaultDarkTheme);
  const [pokemons, setPokemons] = useState([]);
  const [ selectedPokemon, setSelectedPokemon ] = useState( -1 );
  const [ isLoading, setIsLoading ] = useState( false );

  const handleToggle = () => {
    setDarkMode(!isDarkMode);
    // console.log(isDarkMode);
  };
  

  const filterPokemons = async () => {
    setIsLoading( true );
    setPokemons( [] );
    fetchPokemons().then(async (res) => {
      const newPokemons = [];
      console.log(res.data.results);
      await axios.all(res.data.results.map(async (pokemon, i) =>{
        await fetchPokemonData(pokemon.name).then(async json => {
          newPokemons[i] = json;
        })
      }))
      setPokemons(newPokemons);
      setIsLoading( false );
    })
  }

  useEffect(() => {
    filterPokemons();
  }, []);

  // useEffect(() => {
  //   getPokemonsDetails(pokemons);
  // }, [pokemons]);
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
  const Content = () => {
    if (isLoading) {
      return <Loader />;
    }
    return (
      <>
      {pokemons &&
        pokemons.map((pokemon, i) => (
          <Card pokemon={ pokemon } key={ i } onClick={ () => setSelectedPokemon( i ) }/>
        ))}
      </>
    );
  }
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
        <Content />
        { selectedPokemon !== -1 && <p>{pokemons[selectedPokemon]}</p>}
      </Container>
    </Main>
  );
};

export default App;
