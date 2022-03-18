import axios from 'axios';

const API = process.env.REACT_APP_API;

export const signinAPI = async (user) => await axios.post(`${API}/auth/signin`, user);

export const signupAPI = async (user) => await axios.post(`${API}/auth/signup`, user);

export const profileAPI = async (token) => await axios.get(`${API}/auth/profile`, {
    headers: {
        Authorization: token
    }
});