import React from 'react';
import TaskForm from '../forms/TaskForm';
import {TaskAPI} from '../api';
import {useHistory} from 'react-router-dom';
import {useNotification} from '../context/Notification';

function TaskAdd() {
  const history = useHistory();
  const {addSuccess, addFailure} = useNotification();

  async function createTask(task) {
    const res = await TaskAPI.createTask(task);
    if (!res.error) {
      addSuccess(res.message);
      history.push('/');
    } else {
      addFailure(res.error);
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Add Task</h3>
      <TaskForm onSubmit={createTask} />
    </div>
  );
}

export default TaskAdd;
