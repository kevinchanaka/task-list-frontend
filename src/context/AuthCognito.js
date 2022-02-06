import {createContext, useContext} from 'react';
import {Auth} from 'aws-amplify';

Auth.configure({
  userPoolId: 'ap-southeast-2_1tABiQmkv',
  userPoolWebClientId: '1s3d9fhogohfbe2enafn8ucovb',
});

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(props) {
  async function registerUser(name, email, password) {
    try {
      const res = await Auth.signUp({
        username: email,
        password: password,
      });
      return res;
    } catch (error) {
      return {error: error.message};
    }
  }

  function isLoggedIn() {
    return false;
  }

  async function loginUser(email, password) {
    try {
      const res = await Auth.signIn({
        username: email,
        password: password,
      });
      console.log(res);
      return res.AuthenticationResult; // Passed to app via HTTPOnly cookie
    } catch (error) {
      console.log({error: error});
      return {error: error.message};
    }
  }

  async function logoutUser() {

  }

  return (
    <AuthContext.Provider value={{
      registerUser,
      isLoggedIn,
      loginUser,
      logoutUser,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
