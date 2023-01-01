import { useAppSelector, useAppDispatch } from "hooks";
import { removeNotification } from "redux/notifications";
import Toast from "react-bootstrap/Toast";
// import ToastContainer from 'react-bootstrap/ToastContainer';

const toastStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: "5vw",
  width: "30vw",
  zIndex: "10",
};

export default function NotificationBar() {
  const notifications = useAppSelector((state) => state.notifications);
  const dispatch = useAppDispatch();

  return (
    <div style={{ position: "relative" }} className="ml-5 mr-5 mt-3">
      {notifications.map(function (notification) {
        let type = "Error";
        if (notification.type == "success") {
          type = "Success";
        }
        return (
          <Toast
            key={notification.id}
            autohide={true}
            animation={true}
            onClose={() => dispatch(removeNotification(notification.id))}
            delay={5000}
            style={toastStyle}
          >
            <Toast.Header>
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
