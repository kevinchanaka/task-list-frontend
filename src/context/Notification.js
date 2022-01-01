import {createContext, useState, useContext} from 'react';

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

function NotificationProvider(props) {
  const [notification, setNotification] = useState({});

  function addSuccess(message) {
    setNotification({
      message: message,
      type: 'success',
    });
  }

  function addFailure(message) {
    setNotification({
      message: message,
      type: 'danger',
    });
  }

  function clearNotification() {
    setNotification({});
  }

  return (
    <NotificationContext.Provider value={{
      notification,
      setNotification,
      addSuccess,
      addFailure,
      clearNotification,
    }}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
