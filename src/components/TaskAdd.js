import React from 'react';
import TaskForm from '../forms/TaskForm';
import {TaskAPI} from '../api';
import {useHistory} from 'react-router-dom';
import {useNotification} from '../context/Notification';

function TaskAdd() {
  const history = useHistory();
  const {notificationHandler} = useNotification();

  async function createTask(task) {
    if (await notificationHandler(TaskAPI.createTask, task)) {
      history.push('/');
    }
  }

  return (
    <div className="ml-5 mr-5">
      <br />
      <h3>Add Task</h3>
      <TaskForm onSubmit={createTask} />
    </div>
  );
}

export default TaskAdd;
