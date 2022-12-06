import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LabelIconList from '../components/LabelIconList';
import LabelIcon from '../components/LabelIcon';
import {useNotification} from '../context/Notification';
import {TaskHistory, Label} from '../api/task';
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

interface Task {
  name: string
  description: string
  completed: boolean
}

interface TaskFormProps {
  task: TaskHistory | undefined
  labels: Label[]
  onSubmit: (task: Task, labelsToAdd: string[], labelsToRemove: string[])
    => Promise<void>
}

function TaskEditForm(props: TaskFormProps): JSX.Element {
  const [task, setTask] = useState(() => {
    const taskProp = props.task;
    if (taskProp) {
      return {
        name: taskProp.name,
        description: taskProp.description,
        completed: taskProp.completed,
      };
    }
    return {name: '', description: '', completed: false};
  });

  const [show, setShow] = useState(false);
  const {labels, onSubmit} = props;
  const taskLabels = props.task ? props.task.labels : [];

  const [selectedLabels, setSelectedLabels] = useState(() => {
    const initialState: {[key: string]: boolean} = {};
    labels.forEach((value) => {
      for (const label of taskLabels) {
        if (label.id === value.id) {
          initialState[value.id] = true;
          break;
        }
        initialState[value.id] = false;
      }
    });
    return initialState;
  });

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
      const labelsToAdd: string[] = [];
      const labelsToRemove: string[] = [];
      for (const [key, value] of Object.entries(selectedLabels)) {
        if (value) {
          labelsToAdd.push(key);
        } else {
          labelsToRemove.push(key);
        }
      }
      await onSubmit(task, labelsToAdd, labelsToRemove);
    }
  }

  function toggleCheckbox(labelId: string, checked: boolean) {
    setSelectedLabels((prevState) => {
      return {
        ...prevState,
        [labelId]: checked,
      };
    });
  }

  return (
    <div style={{maxWidth: '768px'}}>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Task Labels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {labels.map((label) => {
            return <div key={label.id} className="mb-2">
              <Form.Check type="checkbox"
                label={<LabelIcon label={label}/>}
                checked={selectedLabels[label.id]}
                onChange={(e) => toggleCheckbox(label.id, e.target.checked)} />
            </div>;
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
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
        <Form.Group controlId="labels">
          <Form.Label>Labels</Form.Label>
          <LabelIconList labels={
            labels.filter((label) => selectedLabels[label.id])} />
          <Button className="mt-2" variant="primary"
            onClick={() => setShow(!show)}>Modify Labels</Button>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}


export default TaskEditForm;
