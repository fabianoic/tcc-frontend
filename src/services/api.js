import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
  baseURL: 'https://fidbackend.herokuapp.com/',
  validateStatus: status => {
    return status < 500;
  }
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if(token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;