import {createContext, useState, useContext} from 'react';

const networkErrorMessage = 'Unable to communicate to remote server';

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

function NotificationProvider(props) {
  const [notification, setNotification] = useState({});

  async function notificationHandler(callback, args = {}) {
    const response = await callback(args);
    let success = false;
    if (!response.error) {
      addSuccess(response.message);
      success = true;
    } else if (response.error.message == 'Network Error') {
      addFailure(networkErrorMessage);
    } else {
      addFailure(response.error.response.data.message);
    }
    return success; // TODO: return response data if required
  }

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
      networkErrorMessage,
      notificationHandler,
      addSuccess,
      addFailure,
      clearNotification,
    }}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
