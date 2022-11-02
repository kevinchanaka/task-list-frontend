import {useNotification} from '../context/Notification';
import Toast from 'react-bootstrap/Toast';

const toastStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  right: '5vw',
  width: '30vw',
  zIndex: '10',
};

function NotificationBar(): JSX.Element {
  const {notification, clearNotification} = useNotification();
  let type = 'Error';
  if (notification.type == 'success') {
    type = 'Success';
  }
  return (
    <div style={{position: 'relative'}} className="ml-5 mr-5 mt-3">
      {notification.message != '' &&
        <Toast autohide={true} animation={true} onClose={clearNotification}
          delay={5000}
          style={toastStyle}
        >
          <Toast.Header >
            <strong>
              <span className={`text-${notification.type}`}>{type}</span>
            </strong>
          </Toast.Header>
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
      }
    </div>
  );
}

export default NotificationBar;
