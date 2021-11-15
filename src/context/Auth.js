import {createContext, useContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {UserAPI} from '../api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props) {
  const [user, setUser] = useLocalStorage('user', {});

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

  return (
    <AuthContext.Provider value={{
      registerUser,
      loginUser,
      logoutUser,
      refreshCredentials,
      isLoggedIn,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
