import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import taskSchema from '../schema/task';
import {useNotification} from '../context/Notification';

function TaskForm(props) {
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

  function handleChange(event) {
    // should do basic data validation here if required
    // e.g. prevent text from being entered into number field
    setTask((prevState) => {
      return {...prevState, [event.target.name]: event.target.value};
    });
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const {error} = taskSchema.validate(task);
    if (error) {
      addFailure(error.message);
    } else {
      await props.onSubmit(task);
    }
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Name"
          value={task.name} onChange={handleChange}/>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" placeholder="Description"
          value={task.description} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}


export default TaskForm;
