import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PokeCard = styled.div`
  display: flex;
  flex-direction: row;
  height: 300px;
  width: 440px;
  border-radius: 10px;
  /* padding: 1rem; */
  /* background: linear-gradient(70deg, var(--color) 40%, var(--color) 40%); */
  background-color: var(--color);
  /* box-shadow: 0 0 20px 0 var(--color); */
  position: relative;

  @media screen and (max-width: 599px) {
    width: 350px;
    height: 200px;
  }

  @media screen and (min-width: 600px) and (max-width: 767px) {
    width: 280px;
    height: 200px;
  }

  @media screen and (min-width: 768px) and (max-width: 799px) {
    width: 340px;
    height: 200px;
  }

  @media screen and (min-width: 800px) and (max-width: 1449px) {
    width: 380px;
    height: 200px;
  }
`;

const SecondType = styled.div`
  position: absolute;
  width: 220px;
  height: 300px;
  background: var(--color);
  z-index: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  /* @media only screen and (min-width: 1024px) and (max-width: 1366px) {
    width: 215px;
  } */

  @media screen and (max-width: 799px) {
    width: 175px;
    height: 200px;
  }

  @media screen and (min-width: 600px) and (max-width: 767px) {
    width: 140px;
    height: 200px;
  }

  @media screen and (min-width: 768px) and (max-width: 799px) {
    width: 170px;
    height: 200px;
  }

  @media screen and (min-width: 800px) and (max-width: 1449px) {
    width: 190px;
    height: 200px;
  }
`;

const CardImage = styled.div`
  width: 50%;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 50%;
  z-index: 9999;
  margin-left: 1rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > h2 {
    font-size: 3rem;
    color: ${(props) => (!props.light ? "#fff" : "#000")};
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    z-index: 9999;

    @media screen and (min-width: 600px) and (max-width: 767px) {
      font-size: 1.5rem;
    }
    @media screen and (min-width: 768px) and (max-width: 799px) {
      font-size: 2rem;
    }

    @media screen and (min-width: 800px) and (max-width: 1449px) {
      font-size: 2.5rem;
    }
  }

  & > span {
    font-size: 1.5rem;
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 100rem;
    padding: 0.3rem 0.7rem;
    margin-bottom: 0.5rem;
    color: #fff;
    text-transform: capitalize;
    z-index: 9999;
    @media screen and (min-width: 600px) and (max-width: 767px) {
      font-size: 0.75rem;
    }
    @media screen and (min-width: 768px) and (max-width: 799px) {
      font-size: 1rem;
    }
    @media screen and (min-width: 800px) and (max-width: 1449px) {
      font-size: 1.25rem;
    }
  }
`;

const NoPokemon = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 2.5rem;
  color: #fff;

  @media screen and (min-width: 600px) and (max-width: 767px) {
    font-size: 1rem;
  }
  @media screen and (min-width: 768px) and (max-width: 799px) {
    font-size: 2rem;
  }
`;

const Pokeball = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: -10px;
  bottom: -10px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.2);

  &::before,
  &::after {
    display: block;
    border-radius: 100%;
  }

  &::before {
    content: "";
    position: relative;
    width: 10em;
    padding-bottom: 10em;
    border: 4em solid currentColor;
    clip-path: polygon(
      0 0,
      0 40%,
      50% 40%,
      50% 60%,
      0 60%,
      0 100%,
      100% 100%,
      100% 60%,
      50% 60%,
      50% 40%,
      100% 40%,
      100% 0
    );
  }

  &::after {
    content: "";
    position: absolute;
    width: 5em;
    padding-bottom: 5em;
    background-color: currentColor;
  }
`;

const Card = ({ pokemon: { data } }) => {
  const { name, id, sprites, types } = data;
  const imgURL =
    sprites.other.dream_world.front_default ||
    sprites.other["official-artwork"].front_default;
  // const pokemon_types = types.map((t) => (t.type.name));
  const first_type = "type-" + types[0].type.name;
  const second_type = types[1]
    ? "type-" + types[1].type.name
    : "type-" + types[0].type.name;
  const paddedId = "#" + id.toString().padStart(3, "000");
  return (
    <PokeCard className={`${second_type}`}>
      <SecondType className={`${first_type}`} />
      <CardImage>
        <img src={imgURL} alt={name} />
      </CardImage>
      <NoPokemon>{paddedId}</NoPokemon>
      <Pokeball />
      <CardContent>
        <h2>{name}</h2>
        {types.map((t, i) => (
          <span key={i}>{t.type.name}</span>
        ))}
      </CardContent>
    </PokeCard>
  );
};

export default Card;
