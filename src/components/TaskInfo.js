import React from 'react';
import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {TaskAPI} from '../api';
import Button from 'react-bootstrap/Button';

function TaskInfo(props) {
  const {id} = useParams();
  const history = useHistory();
  const [task, setTask] = useState({});

  useEffect(async () => {
    const taskInfo = await TaskAPI.getTask({id: id});
    setTask(taskInfo);
  }, []);

  async function deleteTask() {
    await TaskAPI.removeTask({id: id});
    history.push('/');
  }

  async function editTask() {
    history.push({
      pathname: `/edit-task/${id}`,
      state: task,
    });
  }

  return (
    <div className="ml-5 mr-5">
      <br />
      <h3>Task Information</h3>
      <p><span className="font-weight-bold">ID: </span>{task.id}</p>
      <p><span className="font-weight-bold">Name: </span>{task.name}</p>
      <p>
        <span className="font-weight-bold">
            Description: </span>{task.description}
      </p>
      <Button variant="primary" onClick={editTask}
        className="mr-2">Edit Task</Button>
      <Button variant="danger" onClick={deleteTask}>Delete Task</Button>
    </div>
  );
}

export default TaskInfo;
