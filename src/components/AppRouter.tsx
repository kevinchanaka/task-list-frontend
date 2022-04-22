import TaskList from './TaskList';
import TaskAdd from './TaskAdd';
import TaskEdit from './TaskEdit';
import TaskInfo from './TaskInfo';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

export default function AppRouter(): JSX.Element {
  return (
    <Switch>
      <PublicRoute path="/login"><UserLogin /></PublicRoute>
      <PublicRoute path="/register"><UserRegister /></PublicRoute>
      <PrivateRoute path="/add-task"><TaskAdd /></PrivateRoute>
      <PrivateRoute path="/edit-task/:id"><TaskEdit /></PrivateRoute>
      <PrivateRoute path="/tasks/:id"><TaskInfo /></PrivateRoute>
      <PrivateRoute path="/"><TaskList /></PrivateRoute>
      <Route exact path="/not-found"><NotFound /></Route>
      <Redirect to="/not-found" />
    </Switch>
  );
}
