import {createContext, useContext, useEffect} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import {UserAPI, request} from '../api';
import {useNotification} from './Notification';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props) {
  const [user, setUser] = useLocalStorage('user', {});
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
          setUser({});
          addFailure('Session expired, please login again');
        }

        initInterceptor(); // adding interceptor again
        return retVal;
      });
    }
    initInterceptor();
  }, []);

  async function registerUser(name, email, password) {
    const res = await UserAPI.registerUser({
      name: name,
      email: email,
      password: password,
    });
    return res;
  }

  async function loginUser(email, password) {
    const res = await UserAPI.loginUser({
      email: email,
      password: password,
    });
    if (!res.error) {
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
    setUser({});
    addSuccess('Logout successful');
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
