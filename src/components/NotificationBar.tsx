import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {removeNotification} from '../redux/notifications';
import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer';

const toastStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  right: '5vw',
  width: '30vw',
  zIndex: '10',
};

// function NotificationBar(): JSX.Element {
//   // const {notification, clearNotification} = useNotification();
//   const notifications = useSelector((state: RootState) => state.notifications);
//   let type = 'Error';
//   if (notification.type == 'success') {
//     type = 'Success';
//   }
//   return (
//     <div style={{position: 'relative'}} className="ml-5 mr-5 mt-3">
//       {notification.message != '' &&
//         <Toast autohide={true} animation={true} onClose={clearNotification}
//           delay={5000}
//           style={toastStyle}
//         >
//           <Toast.Header >
//             <strong>
//               <span className={`text-${notification.type}`}>{type}</span>
//             </strong>
//           </Toast.Header>
//           <Toast.Body>{notification.message}</Toast.Body>
//         </Toast>
//       }
//     </div>
//   );
// }

function NotificationBar(): JSX.Element {
  // const {notification, clearNotification} = useNotification();
  const notifications = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();
  // let type = 'Error';
  // if (notification.type == 'success') {
  //   type = 'Success';
  // }
  return (
    <div style={{position: 'relative'}} className="ml-5 mr-5 mt-3">
      {notifications.map(function(notification) {
        let type = 'Error';
        if (notification.type == 'success') {
          type = 'Success';
        }
        return (
          <Toast key={notification.id} autohide={true} animation={true}
            onClose={() => dispatch(removeNotification(notification.id))}
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
        );
      })}
    </div>
  );
}

export default NotificationBar;
