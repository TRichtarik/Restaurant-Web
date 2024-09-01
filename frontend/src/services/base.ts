import axios from 'axios';

const base = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000',
  headers: {
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true
})

export default base;