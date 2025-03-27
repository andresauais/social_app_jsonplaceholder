import axios from 'axios';

// Instancia personalizada de Axios con una URL base
export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
