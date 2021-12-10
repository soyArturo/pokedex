/**
 * Axios Configuration
 */

import axios from 'axios';

let baseURL = 'https://pokeapi.co/api/v2/';

const axiosClient = axios.create({
    baseURL,
})

export default axiosClient;