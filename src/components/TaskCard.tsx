import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom';
import {TaskAPI, TaskWithId, Task} from '../api';
import {useNotification} from '../context/Notification';

interface TaskCardProps {
  task: TaskWithId
}

function TaskCard(props: TaskCardProps) {
  const history = useHistory<Task>();
  const {addSuccess, addFailure} = useNotification();

  // TODO: should centralise logic to manage tasks
  // e.g. react custom hooks?
  function handleInfoClick(taskId: string) {
    history.push(`tasks/${taskId}`);
  }

  function handleEditClick(task: TaskWithId) {
    const {id, ...state} = task;
    history.push({
      pathname: `/edit-task/${id}`,
      state: state,
    });
  }

  async function deleteTask(taskId: string) {
    const res = await TaskAPI.removeTask({id: taskId});
    if ('error' in res) {
      addFailure(res.error);
    } else {
      addSuccess(res.message);
      /* TODO: below code is a hacky workaround since history.push to the
         same path does not cause a re-render */
      history.push('/not-found');
      history.push('/');
    }
  }

  return (
    <Col>
      <Card className="mt-3">
        <Card.Body>
          <b>{props.task.name}</b>
          <div className='float-right'>
            <Button className='ml-1 mr-1'
              onClick={() => handleInfoClick(props.task.id)}>
              <i className="bi bi-info-circle"></i>
            </Button>
            <Button className='ml-1 mr-1'
              onClick={() => handleEditClick(props.task)}>
              <i className="bi bi-pencil"></i>
            </Button>
            <Button className='ml-1 mr-1' variant='danger'
              onClick={async () => await deleteTask(props.task.id)}>
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TaskCard;
