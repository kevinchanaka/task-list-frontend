import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNotification} from '../context/Notification';
import {Link} from 'react-router-dom';
import {FormControlElement} from '../interfaces';
import {LoginUserReq} from '../api/user';
import {NAME_LENGTH, DEFAULT_LENGTH} from '../config';
import Joi from 'joi';

const userLoginSchema = Joi.object({
  password: Joi.string()
    .required()
    .max(DEFAULT_LENGTH),
  email: Joi.string()
    .required()
    .email({tlds: {allow: false}})
    .max(NAME_LENGTH),
});

interface UserLoginFormProps {
  onSubmit: (credentials: LoginUserReq) => Promise<void>
}

function UserLoginForm(props: UserLoginFormProps): JSX.Element {
  const [credentials, setCredentials] = useState(() => {
    return {
      email: '',
      password: '',
    };
  });
  const {addFailure} = useNotification();

  function handleChange(event: React.ChangeEvent<FormControlElement>) {
    setCredentials((prevState) => {
      return {...prevState, [event.target.name]: event.target.value};
    });
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {error} = userLoginSchema.validate(credentials);
    if (error) {
      addFailure(error.message);
    } else {
      await props.onSubmit(credentials);
    }
  }

  return (
    <>
      <div style={{maxWidth: '768px'}}>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Email"
              value={credentials.email} autoComplete="off"
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password"
              value={credentials.password} onChange={handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
          Submit
          </Button>
        </Form>
        <div className="mt-2">
          Need an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </>
  );
}

export default UserLoginForm;
