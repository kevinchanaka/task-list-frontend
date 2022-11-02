import TaskEditForm from '../forms/TaskEditForm';
import {TaskAPI, TaskParams, TaskHistory} from '../api/task';
import {useHistory, useParams} from 'react-router-dom';
import {useNotification} from '../context/Notification';

function TaskEdit(): JSX.Element {
  const history = useHistory<TaskHistory>();
  const {id} = useParams<TaskParams>();
  const {addSuccess, addFailure} = useNotification();

  async function handleModifyTask(task: TaskHistory) {
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
      <TaskEditForm onSubmit={handleModifyTask}
        task={history.location.state ? {...history.location.state} : undefined}/>
    </div>
  );
}

export default TaskEdit;
