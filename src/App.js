import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import TaskInfo from './components/TaskInfo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/add-task"><AddTask /></Route>
          <Route path="/edit-task/:id"><EditTask /></Route>
          <Route path="/tasks/:id"><TaskInfo /></Route>
          <Route path="/"><TaskList /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
