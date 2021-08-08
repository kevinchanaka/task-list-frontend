import React from 'react';
import TaskForm from './TaskForm';
import {TaskAPI} from '../api';
import {useHistory} from 'react-router-dom';

function TaskAdd() {
  const history = useHistory();

  async function createTask(task) {
    await TaskAPI.createTask(task);
    history.push('/');
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
