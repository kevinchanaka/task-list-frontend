import {requestHandler} from '.';

function makeUserAPI() {
  return Object.freeze({
    registerUser,
    loginUser,
    logoutUser,
    getAccessToken,
  });

  async function registerUser(user) {
    return await requestHandler({
      method: 'post',
      url: '/users/register',
      data: user,
    });
  }

  async function loginUser(credentials) {
    return await requestHandler({
      method: 'post',
      url: '/users/login',
      data: credentials,
    });
  }

  async function logoutUser() {
    return await requestHandler({
      method: 'post',
      url: '/users/logout',
    });
  }

  async function getAccessToken() {
    return await requestHandler({
      method: 'post',
      url: '/users/token',
    });
  }
}

export const UserAPI = makeUserAPI();
