import axiosLib from 'axios';
import {API_PATH, API_HEADERS, API_TIMEOUT} from '../config';
import {makeTaskAPI} from './TaskAPI';

const request = axiosLib.create({
  baseURL: API_PATH,
  headers: API_HEADERS,
  timeout: API_TIMEOUT,
});

export const TaskAPI = makeTaskAPI({request});
