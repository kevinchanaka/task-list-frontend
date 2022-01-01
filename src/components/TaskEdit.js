import React from 'react';
import TaskForm from '../forms/TaskForm';
import {TaskAPI} from '../api';
import {useHistory, useParams} from 'react-router-dom';
import {useNotification} from '../context/Notification';

function TaskEdit(props) {
  const history = useHistory();
  const {id} = useParams();
  const {addSuccess, addFailure} = useNotification();

  async function modifyTask(task) {
    const res = await TaskAPI.modifyTask({id: id, ...task});
    if (!res.error) {
      addSuccess(res.message);
      history.push('/');
    } else {
      addFailure(res.error);
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Edit Task</h3>
      <TaskForm task={history.location.state} onSubmit={modifyTask} />
    </div>
  );
}

export default TaskEdit;
