import {useContext} from 'react';
import {NotificationContext} from '../context/Notification';

function useNotification() {
  const {notification, setNotification} = useContext(NotificationContext);
  const networkErrorMessage = 'Unable to communicate to remote server';

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

  return Object.freeze({
    notification,
    networkErrorMessage,
    notificationHandler,
    addSuccess,
    addFailure,
    clearNotification,
  });
}

export default useNotification;
