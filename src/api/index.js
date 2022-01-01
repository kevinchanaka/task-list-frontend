import axios from 'axios';
import {API_PATH, API_HEADERS, API_TIMEOUT} from '../config';
import {TaskAPI} from './TaskAPI';
import {UserAPI} from './UserAPI';
import {getAccessToken} from './getAccessToken';

export const request = axios.create({
  baseURL: API_PATH,
  headers: API_HEADERS,
  timeout: API_TIMEOUT,
});

export function requestHandler(args) {
  return (async () => {
    try {
      const response = await request(args);
      return response.data;
    } catch (error) {
      console.log({error: error});
      let message;

      if (error.code && error.code == 'ECONNABORTED') { // Request Timeout
        message = 'Request timeout';
      } else if (error.response) { // HTTP response errors
        if (error.response.status >= 400 && error.response.status < 500) {
          message = 'Request Error';
        } else if (error.response.status >= 500) {
          message = 'Server Error';
        }
      } else {
        message = 'An unknown error occured';
      }
      return {error: message};
    }
  })();
}

export {TaskAPI, UserAPI, getAccessToken};
