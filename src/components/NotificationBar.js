import {useNotification} from '../context/Notification';
import Alert from 'react-bootstrap/Alert';

function NotificationBar(props) {
  const {notification, clearNotification} = useNotification();

  return (
    <div className="ml-5 mr-5 mt-3">
      {Object.keys(notification).length > 0 &&
      <Alert variant={notification.type} dismissible
        onClose={clearNotification}>
        {notification.message}
      </Alert>}
    </div>
  );
}

export default NotificationBar;
