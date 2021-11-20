import axios from 'axios';
import {API_PATH, API_HEADERS, API_TIMEOUT} from '../config';

const axiosInstance = axios.create({
  baseURL: API_PATH,
  headers: API_HEADERS,
  timeout: API_TIMEOUT,
});

/* specifying dedicated function to get access token
  this is done to avoid axios interceptor logic when obtaining new tokens */
export async function getAccessToken() {
  try {
    const response = await axiosInstance.post(`${API_PATH}/users/token`);
    return response.data;
  } catch (error) {
    return {error: error};
  }
}

