import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {TaskAPI, Id, Task} from '../api';
import Button from 'react-bootstrap/Button';
import useDataLoader from '../hooks/useDataLoader';
import LoadingSpinner from './LoadingSpinner';
import {useNotification} from '../context/Notification';

function TaskInfo(): JSX.Element {
  const {id} = useParams<Id>();
  const history = useHistory<Task>();
  const {addSuccess, addFailure} = useNotification();
  const {data, error, loaded} = useDataLoader(() => TaskAPI.getTask({id: id}));

  async function deleteTask() {
    const res = await TaskAPI.removeTask({id: id});
    if ('error' in res) {
      addFailure(res.error);
    } else {
      addSuccess(res.message);
      history.push('/');
    }
  }

  async function editTask() {
    if (data) {
      const {id, ...state} = data.task; // removing ID property from task
      history.push({
        pathname: `/edit-task/${id}`,
        state: state,
      });
    }
  }

  function RenderHelper() {
    if (data && data.task && Object.keys(data.task).length > 0) {
      return (
        <React.Fragment>
          <p>
            <span className="font-weight-bold">ID: </span>{data.task.id}
          </p>
          <p>
            <span className="font-weight-bold">Name: </span>{data.task.name}
          </p>
          <p style={{whiteSpace: 'pre-wrap'}}>
            <span className="font-weight-bold">Description: </span><br />
            {data.task.description}
          </p>
          <Button variant="primary" onClick={editTask} className="mr-2">
          Edit Task
          </Button>
          <Button variant="danger" onClick={deleteTask}>Delete Task</Button>
        </React.Fragment>
      );
    } else {
      return (
        <></>
      );
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Task Information</h3>
      <LoadingSpinner error={error} loaded={loaded}>
        <RenderHelper />
      </LoadingSpinner>
    </div>
  );
}

export default TaskInfo;
