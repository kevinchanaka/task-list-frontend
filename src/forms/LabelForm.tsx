import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNotification} from '../context/Notification';
import {CreateLabelReq} from '../api/label';
import {FormControlElement} from '../interfaces';
import {NAME_LENGTH} from '../config';
import Joi from 'joi';

const labelSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(NAME_LENGTH),
  colour: Joi.string()
    .required()
    .max(7),
});


interface LabelFormProps {
  label?: CreateLabelReq
  onSubmit: (label: CreateLabelReq) => Promise<void>
}

function LabelForm(props: LabelFormProps): JSX.Element {
  const [label, setLabel] = useState(() => {
    if (props.label) {
      return props.label;
    }
    return {name: '', colour: ''};
  });
  const {addFailure} = useNotification();

  function handleChange(event: React.ChangeEvent<FormControlElement>) {
    setLabel((prevState) => {
      return {...prevState, [event.target.name]: event.target.value};
    });
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {error} = labelSchema.validate(label);
    if (error) {
      addFailure(error.message);
    } else {
      await props.onSubmit(label);
    }
  }

  return (
    <div style={{maxWidth: '768px'}}>
      <Form onSubmit={(handleOnSubmit)}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Name"
            value={label.name} autoComplete="off" onChange={handleChange} />
        </Form.Group>
        <Form.Group style={{maxWidth: '50px'}} controlId="colour">
          <Form.Label>Colour</Form.Label>
          <Form.Control type="color" name="colour"
            value={label.colour} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}


export default LabelForm;
