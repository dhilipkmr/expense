import axios from 'axios';

export const signup = (params) => {
  const url = '/signup/';
  return axios.post(url, {...params});
}

export const signin = (params) => {
  const url = '/signin/';
  return axios.post(url, {...params});
}

export const getUserInfo = () => {
  const url = '/userinfo/';
  return axios.post(url, {});
}

export const logoutUser = () => {
  const url = '/logout/';
  return axios.post(url, {});
}

export const new_expense = (params) => {
  const url = '/new_expense/';
  return axios.post(url, {...params});
}

export const get_expense_data = (params) => {
  const url = '/get_expense_data/' ;
  return axios.post(url, params);
}

export const get_expense_summary = (params) => {
  const url = '/get_expense_summary/' ;
  return axios.post(url, params);
}

export const deleteExpenseDate = (params) => {
  const url = '/delete_expense_date/' ;
  return axios.post(url, params);
}

export const edit_expense = (params) => {
  const url = '/edit_expense/' ;
  return axios.post(url, params);
}

export const getFrequentCategories = () => {
  const url = '/getFrequentCategories/';
  return axios.get(url);
}