import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import {API_PATH, API_HEADERS, API_TIMEOUT} from '../config';

const axiosClient = axios.create({
  baseURL: API_PATH,
  headers: API_HEADERS,
  timeout: API_TIMEOUT,
});

export interface RequestOpts {
    url: string,
    method: AxiosRequestConfig['method'],
    data?: AxiosRequestConfig['data']
  }

// export async function request({url, method, data}: RequestOpts) {
//   async function tryRequest() {
//     return await axiosClient.request({url, method, data});
//   }

//   try {
//     const response = await tryRequest();
//     return response.data;
//   } catch (error: unknown) {

//   }
// }

// async function baseRequest({url, method, data}: RequestOpts) {

// }

/* WRITE THE FOLLOWING
generic handler that performs a retry on 401 response code
*/

class ApiClient {
  private axiosClient!: AxiosInstance;

  //   constuctor() {
  //     this.axiosClient = axios.create({
  //       baseURL: API_PATH,
  //       headers: API_HEADERS,
  //       timeout: API_TIMEOUT,
  //     });
  //   }

  async request({url, method, data}: RequestOpts) {
    let response;
    try {
      response = await axiosClient.request({url, method, data});
      return response.data;
    } catch (error: unknown) {
      console.log(error);
      if (this.shouldRetry(error)) {
        try {
          response = await axiosClient.request({
            url: '/users/token', method: 'POST',
          });
          response = await axiosClient.request({url, method, data});
          return response.data;
        } catch (retryErr: unknown) {
          throw retryErr;
        }
      }
      throw error;
    }
  }

  //   handleAxiosError(error: AxiosError) {
  //     let response
  //     if (error.response) {
  //       if (error.response.status == 401) { // 401 response code from API, need to refetch cookie

  //       }
  //     }
  //   }

  shouldRetry(error: unknown) {
    if (axios.isAxiosError(error) && error.response && error.response.status == 401) {
      return true;
    }
    return false;
  }
}

export const apiClient = new ApiClient();

