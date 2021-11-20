import axios from 'axios';
import {API_PATH, API_HEADERS, API_TIMEOUT} from '../config';
import {makeTaskAPI} from './TaskAPI';
import {makeUserAPI} from './UserAPI';
import {getAccessToken} from './getAccessToken';

export const request = axios.create({
  baseURL: API_PATH,
  headers: API_HEADERS,
  timeout: API_TIMEOUT,
});

export const TaskAPI = makeTaskAPI(request);
export const UserAPI = makeUserAPI(request);
export {getAccessToken};
