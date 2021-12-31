import React from 'react';
import TaskForm from '../forms/TaskForm';
import {TaskAPI} from '../api';
import {useHistory, useParams} from 'react-router-dom';
import {useNotification} from '../context/Notification';

function TaskEdit(props) {
  const history = useHistory();
  const {id} = useParams();
  const {notificationHandler} = useNotification();

  async function modifyTask(task) {
    if (await notificationHandler(TaskAPI.modifyTask,
        {id: id, ...task})) {
      history.push('/');
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
