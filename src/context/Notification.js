import {createContext, useState} from 'react';

export const NotificationContext = createContext();

function NotificationProvider(props) {
  // NOTE: logic is implemented in useNotification custom hook
  const [notification, setNotification] = useState({});

  return (
    <NotificationContext.Provider value={{notification, setNotification}}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
