import TaskEditForm from '../forms/TaskEditForm';
import {TaskAPI, TaskParams, TaskHistory} from '../api/task';
import {LabelAPI} from '../api/label';
import {useHistory, useParams} from 'react-router-dom';
import {useNotification} from '../context/Notification';
import useDataLoader from '../hooks/useDataLoader';
import LoadingSpinner from './LoadingSpinner';

interface Task {
  name: string,
  description: string,
  completed: boolean
}

function TaskEdit(): JSX.Element {
  const history = useHistory<TaskHistory>();
  const {id} = useParams<TaskParams>();
  const {addSuccess, addFailure} = useNotification();
  const {data, loaded, error} = useDataLoader(async () => await LabelAPI.getLabels());

  async function handleModifyTask(task: Task,
    labelsToAdd: string[], labelsToRemove: string[]) {
    const taskRes = await TaskAPI.modifyTask({id: id, ...task});
    if ('error' in taskRes) {
      addFailure(taskRes.error);
      return;
    }

    if (labelsToAdd.length > 0) {
      await TaskAPI.addLabels(id, labelsToAdd);
    }
    if (labelsToRemove.length > 0) {
      await TaskAPI.removeLabels(id, labelsToRemove);
    }

    addSuccess(taskRes.message);
    history.push('/');
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Edit Task</h3>
      <LoadingSpinner loaded={loaded} error={error}>
        <div>
          {data &&
            <TaskEditForm onSubmit={handleModifyTask}
              labels={data.labels}
              task={history.location.state ? {...history.location.state} : undefined}/>
          }
        </div>
      </LoadingSpinner>
    </div>
  );
}

export default TaskEdit;
