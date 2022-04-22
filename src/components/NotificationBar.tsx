import {useNotification} from '../context/Notification';
import Alert from 'react-bootstrap/Alert';

function NotificationBar(): JSX.Element {
  const {notification, clearNotification} = useNotification();

  return (
    <div className="ml-5 mr-5 mt-3">
      {notification.message != '' &&
      <Alert variant={notification.type} dismissible
        onClose={clearNotification}>
        {notification.message}
      </Alert>}
    </div>
  );
}

export default NotificationBar;
