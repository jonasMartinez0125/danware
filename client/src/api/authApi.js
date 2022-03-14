import axios from 'axios';

const API = process.env.REACT_APP_API;

export const signin = async (user) => await axios.post(`${API}/auth/signin`, user);

export const signup = async (user) => await axios.post(`${API}/auth/signup`, user);

export const profile = async () => await axios.get(`${API}/auth/profile`);