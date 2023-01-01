import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { API_PATH, API_HEADERS, API_TIMEOUT, ERROR_UNAUTHORIZED } from "../config";

export interface RequestOpts {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
}

export interface AppError {
  message: string;
}

class ApiClient {
  axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: API_PATH,
      headers: API_HEADERS,
      timeout: API_TIMEOUT,
    });
  }

  async request(args: RequestOpts) {
    let response;
    try {
      response = await this.axiosClient.request(args);
      return { data: response.data };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.status == 401) {
        // Current token expired, try to fetch new one and retry request
        try {
          await this.axiosClient.request({ url: "/users/token", method: "POST" });
          response = await this.axiosClient.request(args);
          return { data: response.data };
        } catch (error: unknown) {
          return this.handleError(error);
        }
      }
      return this.handleError(error);
    }
  }

  handleError(error: unknown): { error: AppError } {
    let message: string;
    if (axios.isAxiosError(error)) {
      if (error.code && error.code == "ECONNABORTED") {
        // Request Timeout
        message = "Request timeout";
      } else if (error.response) {
        if (error.response.status == 401) {
          message = ERROR_UNAUTHORIZED;
        } else if (error.response.data.message) {
          message = error.response.data.message;
        } else if (error.response.status >= 400 && error.response.status <= 500) {
          message = "Client error";
        } else {
          message = "Server error";
        }
      } else {
        message = "An unknown request error occured";
      }
    } else {
      console.log(error);
      message = "An unknown error occured";
    }
    return { error: { message } };
  }
}

export const apiClient = new ApiClient();
