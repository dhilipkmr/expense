import axios from 'axios';

export const getUserInfo = (params) => {
  const url = '/getUserInfo';
  return axios.get(url, params);
}
