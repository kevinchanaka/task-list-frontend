import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom';
import React, {useState} from 'react';
import {TaskAPI, Task, TaskHistory} from '../api/task';
import {useNotification} from '../context/Notification';

interface TaskCardProps {
  task: Task
}

function TaskCard(props: TaskCardProps): JSX.Element {
  const history = useHistory<TaskHistory>();
  const {addSuccess, addFailure} = useNotification();
  const [deleted, setDeleted] = useState(false);

  // TODO: should centralise logic to manage tasks
  // e.g. react custom hooks?
  function handleInfoClick(taskId: string) {
    history.push(`tasks/${taskId}`);
  }

  function handleEditClick(task: Task) {
    const {id, name, description, completed} = task;
    history.push({
      pathname: `/edit-task/${id}`,
      state: {
        name: name,
        description: description,
        completed: completed,
      },
    });
  }

  async function deleteTask(taskId: string) {
    const res = await TaskAPI.removeTask(taskId);
    if ('error' in res) {
      addFailure(res.error);
    } else {
      addSuccess(res.message);
      setDeleted(true);
    }
  }

  function RenderHelper(props: {children: React.ReactElement}) {
    if (deleted) {
      return <></>;
    } else {
      return (
        <>{props.children}</>
      );
    }
  }

  return (
    <RenderHelper>
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
            <p style={{whiteSpace: 'pre-line'}}>{props.task.description}</p>
          </Card.Body>
        </Card>
      </Col>
    </RenderHelper>
  );
}

export default TaskCard;
