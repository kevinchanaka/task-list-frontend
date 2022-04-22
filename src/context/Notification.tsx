import React, {
  createContext, useState, useContext, SetStateAction} from 'react';
import {Notification} from '../interfaces';

interface NotificationProviderProps {
  children: React.ReactElement
}

interface NotificationContextInterface {
  notification: Notification,
  setNotification: React.Dispatch<SetStateAction<Notification>>
  addSuccess: (message: string) => void
  addFailure: (message: string) => void
  clearNotification: () => void
}

const NotificationContext = createContext({} as NotificationContextInterface);

export function useNotification() {
  return useContext(NotificationContext);
}

function NotificationProvider(props: NotificationProviderProps) {
  const initialValue: Notification = {message: '', type: ''};

  const [notification, setNotification] = useState(initialValue);

  function addSuccess(message: string) {
    setNotification({
      message: message,
      type: 'success',
    });
  }

  function addFailure(message: string) {
    setNotification({
      message: message,
      type: 'danger',
    });
  }

  function clearNotification() {
    setNotification(initialValue);
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
