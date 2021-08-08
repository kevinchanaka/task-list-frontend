import React from 'react';
import TaskForm from './TaskForm';
import {TaskAPI} from '../api';
import {useHistory, useParams} from 'react-router-dom';

function TaskEdit(props) {
  const history = useHistory();
  const {id} = useParams();

  async function modifyTask(task) {
    const taskData = {id: id, ...task};
    await TaskAPI.modifyTask(taskData);
    history.push('/');
  }

  return (
    <div className="ml-5 mr-5">
      <br />
      <h3>Edit Task</h3>
      <TaskForm task={history.location.state} onSubmit={modifyTask} />
    </div>
  );
}

export default TaskEdit;
