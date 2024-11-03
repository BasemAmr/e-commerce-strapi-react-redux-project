import axios from "axios";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL

export const instance = axios.create({
    baseURL: VITE_SERVER_URL,
    timeout: 1000,
  });