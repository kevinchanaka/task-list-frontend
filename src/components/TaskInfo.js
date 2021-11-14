import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {TaskAPI} from '../api';
import Button from 'react-bootstrap/Button';
import useDataLoader from '../hooks/useDataLoader';
import LoadingSpinner from './LoadingSpinner';
import useNotification from '../hooks/useNotification';

function TaskInfo(props) {
  const {id} = useParams();
  const history = useHistory();
  const {notificationHandler} = useNotification();
  const {data, error, loaded} = useDataLoader(TaskAPI.getTask, {id: id});
  const task = data.task;

  async function deleteTask() {
    if (await notificationHandler(TaskAPI.removeTask, {id: id})) {
      history.push('/');
    }
  }

  async function editTask() {
    const {id, ...state} = task; // removing ID property from task
    history.push({
      pathname: `/edit-task/${id}`,
      state: state,
    });
  }

  return (
    <div className="ml-5 mr-5">
      <br />
      <h3>Task Information</h3>
      <LoadingSpinner error={error} loaded={loaded}>
        {task &&
        <React.Fragment>
          <p><span className="font-weight-bold">ID: </span>{task.id}</p>
          <p><span className="font-weight-bold">Name: </span>{task.name}</p>
          <p><span className="font-weight-bold">
            Description: </span>{task.description}
          </p>
          <Button variant="primary" onClick={editTask} className="mr-2">
            Edit Task
          </Button>
          <Button variant="danger" onClick={deleteTask}>Delete Task</Button>
        </React.Fragment>
        }
      </LoadingSpinner>
    </div>
  );
}

export default TaskInfo;
