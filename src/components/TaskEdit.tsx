import React from 'react';
import TaskForm from '../forms/TaskForm';
import {TaskAPI, Id, Task} from '../api';
import {useHistory, useParams} from 'react-router-dom';
import {useNotification} from '../context/Notification';

function TaskEdit() {
  const history = useHistory<Task>();
  const {id} = useParams<Id>();
  const {addSuccess, addFailure} = useNotification();

  async function handleModifyTask(task: Task) {
    const res = await TaskAPI.modifyTask({id: id, ...task});
    if ('error' in res) {
      addFailure(res.error);
    } else {
      addSuccess(res.message);
      history.push('/');
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Edit Task</h3>
      <TaskForm task={history.location.state} onSubmit={handleModifyTask} />
    </div>
  );
}

export default TaskEdit;
