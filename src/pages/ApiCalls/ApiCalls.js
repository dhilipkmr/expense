import axios from 'axios';

export const signup = (params) => {
  const url = '/signup/';
  return axios.post(url, {...params});
}

export const signin = (params) => {
  const url = '/signin/';
  return axios.post(url, {...params});
}

