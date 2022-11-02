import axios, {AxiosRequestConfig} from 'axios';
import {API_PATH, API_HEADERS, API_TIMEOUT} from '../config';

export const request = axios.create({
  baseURL: API_PATH,
  headers: API_HEADERS,
  timeout: API_TIMEOUT,
});

export async function handler<T>(
  args: AxiosRequestConfig): Promise<T | {error: string}> {
  try {
    const response = await request.request<T>(args);
    return response.data;
  } catch (error: unknown) {
    console.log({error});
    let message;
    if (axios.isAxiosError(error)) {
      if (error.code && error.code == 'ECONNABORTED') { // Request Timeout
        message = 'Request timeout';
      } else if (error.response &&
        error.response.data && error.response.data.message) {
        message = error.response.data.message; // Error from API
      } else if (error.response) { // general HTTP response errors
        if (error.response.status >= 400 && error.response.status < 500) {
          message = 'Request Error';
        } else if (error.response.status >= 500) {
          message = 'Server Error';
        }
      } else {
        message = 'An unknown error occured';
      }
    }
    return {error: message};
  }
}
