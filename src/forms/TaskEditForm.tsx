import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNotification} from '../context/Notification';
import {TaskHistory} from '../api/task';
import {FormControlElement} from '../interfaces';
import {NAME_LENGTH, DEFAULT_LENGTH} from '../config';
import Joi from 'joi';

const taskEditSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(NAME_LENGTH),
  description: Joi.string()
    .required()
    .allow('')
    .max(DEFAULT_LENGTH),
  completed: Joi.boolean()
    .required(),
});

interface TaskFormProps {
  task: TaskHistory | undefined
  onSubmit: (task: TaskHistory) => Promise<void>
}

function TaskEditForm(props: TaskFormProps): JSX.Element {
  const [task, setTask] = useState(() =>
    props.task ? props.task : {name: '', description: '', completed: false});
  const {addFailure} = useNotification();

  function handleChange(event: React.ChangeEvent<FormControlElement>) {
    setTask((prevState) => {
      return {...prevState, [event.target.name]: event.target.value};
    });
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {error} = taskEditSchema.validate(task);
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
        <Form.Group controlId="completed">
          <Form.Check type="checkbox" label="Completed"
            checked={task.completed}
            onChange={(e) => {
              setTask((prevState) => {
                return {
                  ...prevState, completed: Boolean(e.target.checked),
                };
              });
            }} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}


export default TaskEditForm;
