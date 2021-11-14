import axios from 'axios';
import {API_PATH, API_HEADERS, API_TIMEOUT} from '../config';
import {makeTaskAPI} from './TaskAPI';
import {makeUserAPI} from './UserAPI';

const request = axios.create({
  baseURL: API_PATH,
  headers: API_HEADERS,
  timeout: API_TIMEOUT,
});

export const TaskAPI = makeTaskAPI({request});
export const UserAPI = makeUserAPI({request});

// TODO: need to separate concerns better
request.interceptors.request.use(function(config) {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user) {
    config.headers['Authorization'] = 'Bearer ' + user.accessToken;
  }
  return config;
}, function(error) {
  Promise.reject(error);
});

const interceptor = request.interceptors.response.use(function(response) {
  return response;
}, async function(error) {
  if (error.response.status != 401) {
    return Promise.reject(error);
  }
  request.interceptors.response.eject(interceptor);
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user && user.refreshToken) {
    const res = await UserAPI.getAccessToken(user.refreshToken);
    user.accessToken = res.user.accessToken;
    error.config.headers['Authorization'] = 'Bearer ' + user.accessToken;
    window.localStorage.setItem('user', JSON.stringify(user));
    // TODO: handle expired refresh token and auto logout
    return request(error.config);
  }
  return Promise.reject(error);
});
