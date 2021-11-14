import {createContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useLocalStorage('user', {});

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
