import NotificationProvider from './context/Notification';
import NotificationBar from './components/NotificationBar';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskAdd from './components/TaskAdd';
import TaskEdit from './components/TaskEdit';
import TaskInfo from './components/TaskInfo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div>
      <NotificationProvider>
        <Router>
          <Header />
          <NotificationBar />
          <Switch>
            <Route path="/add-task"><TaskAdd /></Route>
            <Route path="/edit-task/:id"><TaskEdit /></Route>
            <Route path="/tasks/:id"><TaskInfo /></Route>
            <Route path="/"><TaskList /></Route>
          </Switch>
        </Router>
      </NotificationProvider>
    </div>
  );
}

export default App;
