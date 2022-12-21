import TaskAddForm from '../forms/TaskAddForm';
import {TaskAPI, CreateTaskReq} from '../api/task';
import {useHistory} from 'react-router-dom';
// import {useNotification} from '../context/Notification';
import {useAppDispatch} from '../redux/hooks';
import {addSuccess, addFailure} from '../redux/notifications';

function TaskAdd(): JSX.Element {
  const history = useHistory();
  const dispatch = useAppDispatch();

  // const {addSuccess, addFailure} = useNotification();

  async function handleCreateTask(task: CreateTaskReq) {
    const res = await TaskAPI.createTask(task);
    if ('error' in res) {
      dispatch(addFailure(res.error));
    } else {
      dispatch(addSuccess(res.message));
      history.push('/');
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Add Task</h3>
      <TaskAddForm onSubmit={handleCreateTask} />
    </div>
  );
}

export default TaskAdd;
