import {createContext, useContext, useEffect, useRef} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {UserAPI, getAccessToken, request} from '../api';
import {useNotification} from './Notification';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props) {
  const [user, setUser] = useLocalStorage('user', {});
  const accessToken = useRef('');
  const {addFailure} = useNotification();
  useEffect(() => {
    /* setting up axios interceptors, these are used
      to obtain new JWT access tokens via refresh tokens */
    if (!isLoggedIn()) {
      return;
    }

    const reqIntercept = request.interceptors.request.use(function(config) {
      config.headers['Authorization'] = 'Bearer ' + accessToken.current;
      return config;
    }, function(error) {
      Promise.reject(error);
    });

    const resIntercept = request.interceptors.response.use(function(response) {
      return response;
    }, async function(error) {
      if (error.response.status != 401) {
        return Promise.reject(error);
      }
      const res = await getAccessToken();
      if (!res.error) {
        accessToken.current = res.user.accessToken;
        error.config.headers['Authorization'] = 'Bearer ' + accessToken.current;
        return request(error.config);
      }
      request.interceptors.response.eject(resIntercept);
      accessToken.current = '';
      await logoutUser();
      addFailure('Session expired, please login again');
      return Promise.reject(error);
    });

    return function() {
      if (!isLoggedIn()) {
        return;
      }
      request.interceptors.request.eject(reqIntercept);
      request.interceptors.response.eject(resIntercept);
    };
  }, [user]);

  async function registerUser(name, email, password) {
    return await UserAPI.registerUser({
      name: name,
      email: email,
      password: password,
    });
  }

  async function loginUser(email, password) {
    const res = await UserAPI.loginUser({
      email: email,
      password: password,
    });
    if (!res.error) {
      accessToken.current = res.user.accessToken;
      setUser({
        email: res.user.email,
        id: res.user.id,
        name: res.user.name,
      });
      return true;
    }
    return false;
  }

  async function logoutUser() {
    if (isLoggedIn()) {
      await UserAPI.logoutUser();
    }
    setUser({});
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
      isLoggedIn,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
