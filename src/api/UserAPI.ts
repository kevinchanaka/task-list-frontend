import {requestHandler, request} from '.';

export interface LoginUserRequest {
  email: string,
  password: string,
}

export interface RegisterUserRequest {
  name: string,
  email: string,
  password: string,
}

export interface User {
  name: string,
  email: string
}

export interface RegisterUserResponse {
  user: User
  message: string
}

export interface LoginUserResponse {
  user: {
    name: string
    email: string
    id: string
  }
  message?: string
}

interface LogoutUserResponse {
  message: string
}

function makeUserAPI() {
  return Object.freeze({
    registerUser,
    loginUser,
    logoutUser,
    getAccessToken,
  });

  async function registerUser(user: RegisterUserRequest) {
    return await requestHandler<RegisterUserResponse>({
      method: 'post',
      url: '/users/register',
      data: user,
    });
  }

  async function loginUser(credentials: LoginUserRequest) {
    return await requestHandler<LoginUserResponse>({
      method: 'post',
      url: '/users/login',
      data: credentials,
    });
  }

  async function logoutUser() {
    return await requestHandler<LogoutUserResponse>({
      method: 'post',
      url: '/users/logout',
    });
  }

  async function getAccessToken() {
    return await request.post<Record<string, never>>('/users/token');
  }
}

export const UserAPI = makeUserAPI();
