import axios from 'axios';
import dotenv from 'dotenv';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND
})


export default api;