import TaskList from "components/task/TaskList";
import TaskAdd from "components/task/TaskAdd";
import TaskEdit from "components/task/TaskEdit";
import TaskInfo from "components/task/TaskInfo";
import UserLogin from "components/user/UserLogin";
import UserRegister from "components/user/UserRegister";
import LabelList from "components/label/LabelList";
import LabelAdd from "components/label/LabelAdd";
import LabelInfo from "components/label/LabelInfo";
import LabelEdit from "components/label/LabelEdit";
import NotFound from "components/common/NotFound";
import PrivateRoute from "components/common/PrivateRoute";
import PublicRoute from "components/common/PublicRoute";

import { Switch, Route, Redirect } from "react-router-dom";

export default function AppRouter() {
  return (
    <Switch>
      <PublicRoute path="/login">
        <UserLogin />
      </PublicRoute>
      <PublicRoute path="/register">
        <UserRegister />
      </PublicRoute>
      <PrivateRoute path="/add-task">
        <TaskAdd />
      </PrivateRoute>
      <PrivateRoute path="/edit-task/:id">
        <TaskEdit />
      </PrivateRoute>
      <PrivateRoute path="/tasks/:id">
        <TaskInfo />
      </PrivateRoute>
      <PrivateRoute path="/labels/:id">
        <LabelInfo />
      </PrivateRoute>
      <PrivateRoute path="/labels">
        <LabelList />
      </PrivateRoute>
      <PrivateRoute path="/add-label">
        <LabelAdd />
      </PrivateRoute>
      <PrivateRoute path="/edit-label/:id">
        <LabelEdit />
      </PrivateRoute>
      <PrivateRoute path="/">
        <TaskList />
      </PrivateRoute>
      <Route exact path="/not-found">
        <NotFound />
      </Route>
      <Redirect to="/not-found" />
    </Switch>
  );
}
