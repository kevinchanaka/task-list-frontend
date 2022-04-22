import TaskForm from '../forms/TaskForm';
import {TaskAPI, Task} from '../api';
import {useHistory} from 'react-router-dom';
import {useNotification} from '../context/Notification';

function TaskAdd(): JSX.Element {
  const history = useHistory();
  const {addSuccess, addFailure} = useNotification();

  async function handleCreateTask(task: Task) {
    const res = await TaskAPI.createTask(task);
    if ('error' in res) {
      addFailure(res.error);
    } else {
      addSuccess(res.message);
      history.push('/');
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Add Task</h3>
      <TaskForm onSubmit={handleCreateTask} />
    </div>
  );
}

export default TaskAdd;
