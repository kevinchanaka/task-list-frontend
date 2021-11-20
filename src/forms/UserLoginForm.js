import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {userLoginSchema} from '../schema/user';
import {useNotification} from '../context/Notification';
import {Link} from 'react-router-dom';

function UserLoginForm(props) {
  const [credentials, setCredentials] = useState(() => {
    return {
      email: '',
      password: '',
    };
  });
  const {addFailure} = useNotification();

  function handleChange(event) {
    setCredentials((prevState) => {
      return {...prevState, [event.target.name]: event.target.value};
    });
  }

  async function handleOnSubmit(event) {
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
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Email"
            value={credentials.email} onChange={handleChange}/>
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
      <p>Need an account? <Link to="/register">Register</Link></p>
    </>
  );
}

export default UserLoginForm;
