import NotificationProvider from '../context/Notification';
import AuthProvider from '../context/Auth';
import NotificationBar from './NotificationBar';
import Header from './Header';
import TaskList from './TaskList';
import TaskAdd from './TaskAdd';
import TaskEdit from './TaskEdit';
import TaskInfo from './TaskInfo';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Container from 'react-bootstrap/Container';

import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <Container fluid={true}
            className="d-flex justify-content-center"
            style={{minHeight: '100vh', minWidth: '100vw'}}
          >
            <div style={{minWidth: '100vw'}}>
              <Header />
              <NotificationBar />
              <Switch>
                <PublicRoute path="/login"><UserLogin /></PublicRoute>
                <PublicRoute path="/register"><UserRegister /></PublicRoute>
                <PrivateRoute path="/add-task"><TaskAdd /></PrivateRoute>
                <PrivateRoute path="/edit-task/:id"><TaskEdit /></PrivateRoute>
                <PrivateRoute path="/tasks/:id"><TaskInfo /></PrivateRoute>
                <PrivateRoute path="/"><TaskList /></PrivateRoute>
              </Switch>
            </div>
          </Container>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
