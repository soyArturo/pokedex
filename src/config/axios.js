/**
 * Axios Configuration
 */

import axios from 'axios';

let baseURL = 'https://pokeapi.co/api/v2/';

const axiosClient = axios.create({
    baseURL,
})

export const fetchPokemons = async ( limit = 151, offset = 0 ) => {

    return axiosClient.get( `pokemon?limit=${ limit }&offset=${ offset }` );

}


// fetch specific pokemon data
export const fetchPokemonData = async ( id ) => {

    return axiosClient.get( `pokemon/${ id }` );

}