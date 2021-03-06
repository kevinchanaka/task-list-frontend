import React, {createContext, useContext, useEffect} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {UserAPI, request, RegisterUserResponse,
  LoginUserResponse} from '../api';
import {useNotification} from './Notification';

interface UserState {
  email: string,
  id: string,
  name: string,
}

interface AuthProviderProps {
  children: React.ReactElement
}

interface AuthContextInterface {
  registerUser: (name: string, email: string, password: string) =>
    Promise<RegisterUserResponse | {error: string;}>
  loginUser: (email: string, password: string) =>
    Promise<LoginUserResponse | {error: string;}>
  logoutUser: () => void
  isLoggedIn: () => boolean
}

const AuthContext = createContext({} as AuthContextInterface);

export function useAuth(): AuthContextInterface {
  return useContext(AuthContext);
}

function AuthProvider(props: AuthProviderProps): JSX.Element {
  const initialValue: UserState = {email: '', id: '', name: ''};
  const [user, setUser] = useLocalStorage<UserState>('user', initialValue);
  const {addSuccess, addFailure} = useNotification();

  useEffect(() => {
    /* setting up axios interceptors, these are used
      to obtain new JWT access tokens via refresh tokens */
    function initInterceptor() {
      const interceptor = request.interceptors.response.use(function(response) {
        return response;
      }, async function(error) {
        if (error.response.status != 401) {
          return Promise.reject(error);
        }
        // ejecting interceptor to prevent infinite loop
        request.interceptors.response.eject(interceptor);

        // token refresh
        let retVal;
        try {
          await UserAPI.getAccessToken();
          retVal = request.request(error.config);
        } catch (error) {
          retVal = Promise.reject(error);
          setUser(initialValue);
          addFailure('Session expired, please login again');
        }

        initInterceptor(); // adding interceptor again
        return retVal;
      });
    }
    initInterceptor();
  }, []);

  async function registerUser(name: string, email: string, password: string) {
    const res = await UserAPI.registerUser({
      name: name,
      email: email,
      password: password,
    });
    return res;
  }

  async function loginUser(email: string, password: string) {
    const res = await UserAPI.loginUser({
      email: email,
      password: password,
    });
    if (!('error' in res)) {
      setUser({
        email: res.user.email,
        id: res.user.id,
        name: res.user.name,
      });
    }
    return res;
  }

  async function logoutUser() {
    await UserAPI.logoutUser();
    setUser(initialValue);
    addSuccess('Logout successful');
  }

  function isLoggedIn() {
    if (user.email == '' || user.name == '' || user.id == '') {
      return false;
    }
    return true;
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
