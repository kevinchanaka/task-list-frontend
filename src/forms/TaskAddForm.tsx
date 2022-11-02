import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNotification} from '../context/Notification';
import {CreateTaskReq} from '../api/task';
import {FormControlElement} from '../interfaces';
import {NAME_LENGTH, DEFAULT_LENGTH} from '../config';
import Joi from 'joi';

const taskAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(NAME_LENGTH),
  description: Joi.string()
    .required()
    .allow('')
    .max(DEFAULT_LENGTH),
});


interface TaskFormProps {
  onSubmit: (task: CreateTaskReq) => Promise<void>
}

function TaskAddForm(props: TaskFormProps): JSX.Element {
  const [task, setTask] = useState({name: '', description: ''});
  const {addFailure} = useNotification();

  function handleChange(event: React.ChangeEvent<FormControlElement>) {
    setTask((prevState) => {
      return {...prevState, [event.target.name]: event.target.value};
    });
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {error} = taskAddSchema.validate(task);
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


export default TaskAddForm;
