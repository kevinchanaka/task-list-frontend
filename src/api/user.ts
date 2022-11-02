import {handler, request} from '.';
import {AxiosResponse} from 'axios';

export interface LoginUserReq {
  email: string,
  password: string,
}

export interface RegisterUserReq {
  name: string,
  email: string,
  password: string,
}

export interface User {
  name: string,
  email: string
}

export interface RegisterUserRes {
  user: User
  message: string
}

export interface LoginUserRes {
  user: {
    name: string
    email: string
    id: string
  }
  message?: string
}

interface LogoutUserRes {
  message: string
}

export const UserAPI = {
  registerUser: async (user: RegisterUserReq):
    Promise<{error: string;} | RegisterUserRes> =>
    await handler<RegisterUserRes>({
      method: 'post',
      url: '/users/register',
      data: user,
    }),
  loginUser: async (credentials: LoginUserReq):
    Promise<{error: string;} | LoginUserRes> =>
    await handler<LoginUserRes>({
      method: 'post',
      url: '/users/login',
      data: credentials,
    }),
  logoutUser: async (): Promise<{error: string;} | LogoutUserRes> =>
    await handler<LogoutUserRes>({method: 'post', url: '/users/logout'}),
  getAccessToken: async (): Promise<AxiosResponse<Record<string, never>>> =>
    await request.post<Record<string, never>>('/users/token'),
};
