import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import taskSchema from '../schema/task';
import {useNotification} from '../context/Notification';
import {Task} from '../api';
import {FormControlElement} from '../interfaces';

interface TaskFormProps {
  task?: Task
  onSubmit: (task: Task) => Promise<void>
}

function TaskForm(props: TaskFormProps): JSX.Element {
  const [task, setTask] = useState(() => {
    let taskData;
    if (props.task) {
      taskData = props.task;
    } else {
      taskData = {
        name: '',
        description: '',
      };
    }
    return taskData;
  });
  const {addFailure} = useNotification();

  function handleChange(event: React.ChangeEvent<FormControlElement>) {
    // should do basic data validation here if required
    // e.g. prevent text from being entered into number field
    setTask((prevState) => {
      return {...prevState, [event.target.name]: event.target.value};
    });
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {error} = taskSchema.validate(task);
    if (error) {
      addFailure(error.message);
    } else {
      await props.onSubmit(task);
    }
  }

  return (
    <div style={{maxWidth: '768px'}}>
      <Form onSubmit={(handleOnSubmit)}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Name"
            value={task.name} autoComplete="off" onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description"
            placeholder="Description"
            value={task.description} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
        Submit
        </Button>
      </Form>
    </div>
  );
}


export default TaskForm;
