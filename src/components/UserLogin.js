import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAuth from '../hooks/useAuth';
import {useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import useNotification from '../hooks/useNotification';
import {userLoginSchema} from '../schema/user';

function UserLogin(props) {
  const [credentials, setCredentials] = useState(() => {
    return {
      email: '',
      password: '',
    };
  });
  const {loginUser} = useAuth();
  const {addFailure} = useNotification();
  const history = useHistory();

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
      return;
    }
    const res = await loginUser(credentials.email, credentials.password);
    if (res) {
      history.push('/');
    } else {
      addFailure('Incorrect username or password');
    }
  }

  return (
    <div className="ml-5 mr-5">
      <br />
      <h3>User Login</h3>
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
    </div>
  );
}


export default UserLogin;
