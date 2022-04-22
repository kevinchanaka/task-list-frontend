import NotificationProvider from '../context/Notification';
import AuthProvider from '../context/Auth';
import NotificationBar from './NotificationBar';
import Header from './Header';
import AppRouter from './AppRouter';
import Container from 'react-bootstrap/Container';
import {BrowserRouter as Router} from 'react-router-dom';

function App(): JSX.Element {
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
              <AppRouter />
            </div>
          </Container>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
