import React, { useState, useEffect, useContext } from "react";
import { fetchPokemonData, fetchPokemons } from "../../config/axios";
import axios from "axios";
import styled from "styled-components";

import Loader from "../Loader/Loader";
import Card from "../Card/Card";
import { ThemeContext } from "../../context/ThemeContext";
import Nav from "../Nav/Nav";

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

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  width: 100%;
  height: 100vh;
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

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => (props.light ? "#f5f5f5" : "#181818")};
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: ${(props) => (props.light ? "#c3c3c3" : "#333")};
  }

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

const PokeView = (gen) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  console.log(gen.gen.limit);

  const filterPokemons = async () => {
    setIsLoading(true);
    setPokemons([]);
    if (gen.gen.limit == null || gen.gen.offset == null) {
      return;
    }
    fetchPokemons(gen.gen.limit, gen.gen.offset).then(async (res) => {
      const newPokemons = [];
      console.log(res.data.results);
      await axios.all(
        res.data.results.map(async (pokemon, i) => {
          await fetchPokemonData(pokemon.name).then(async (json) => {
            newPokemons[i] = json;
          });
        })
      );
      setPokemons(newPokemons);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    let mode;
    if (localStorage) {
      mode = localStorage.getItem("darkMode");
    }

    if (mode === "true") {
      theme.dispatch({ type: "DARKMODE" });
    } else {
      theme.dispatch({ type: "LIGHTMODE" });
    }
    filterPokemons();
  }, []);

  useEffect(() => {
    filterPokemons();
    console.log(gen);
  }, [gen.gen])

  const Content = () => {
    if (isLoading) {
      return (
        <FlexContainer>
          <Loader />
        </FlexContainer>
      );
    }
    return (
      <Container light={!darkMode}>
        {pokemons &&
          pokemons.map((pokemon, i) => (
            <Card
              pokemon={pokemon}
              key={i}
              onClick={() => setSelectedPokemon(i)}
            />
          ))}
        {selectedPokemon !== -1 && <p>{pokemons[selectedPokemon]}</p>}
      </Container>
    );
  };

  return (
    <>
      <Nav />
      <Tittle light={!darkMode}>Pokedex!</Tittle>
      <Search placeholder="Search..." />
      <Content />
      {/* <Nav />
            <Tittle light={!darkMode}>Pokedex!</Tittle>
            <Search placeholder="Search..." />
            <Content /> */}
    </>
  );
};

export default PokeView;
