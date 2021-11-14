import {useContext} from 'react';
import {AuthContext} from '../context/Auth';
import {UserAPI} from '../api';

function useAuth() {
  const {user, setUser} = useContext(AuthContext);

  async function registerUser(name, email, password) {
    return await UserAPI.registerUser({
      name: name,
      email: email,
      password: password,
    });
  }

  async function loginUser(email, password) {
    const loggedInUser = await UserAPI.loginUser({
      email: email,
      password: password,
    });
    if (!loggedInUser.error) {
      setUser(loggedInUser.user);
      return true;
    }
    return false;
  }

  async function logoutUser() {
    if (isLoggedIn()) {
      await UserAPI.logoutUser(user.refreshToken);
      setUser({});
    }
  }

  async function refreshCredentials() {
    if (isLoggedIn()) {
      const response = await UserAPI.getAccessToken(user.refreshToken);
      console.log(response);
      setUser((prevState) => {
        return {...prevState, accessToken: response.user.accessToken};
      });
    }
  }

  function isLoggedIn() {
    if (Object.keys(user).length != 0) {
      return true;
    }
    return false;
  }

  return Object.freeze({
    registerUser,
    loginUser,
    logoutUser,
    refreshCredentials,
    isLoggedIn,
  });
}

export default useAuth;
