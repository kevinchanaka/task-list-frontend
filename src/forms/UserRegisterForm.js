import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useNotification} from '../context/Notification';
import {userRegisterSchema} from '../schema/user';
import {Link} from 'react-router-dom';

function UserRegisterForm(props) {
  const [credentials, setCredentials] = useState(() => {
    return {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
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
    if (credentials.password != credentials.passwordRepeat) {
      addFailure('Passwords do not match');
      return;
    }
    const data = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    };
    const {error} = userRegisterSchema.validate(data);
    if (error) {
      addFailure(error.message);
    } else {
      await props.onSubmit(credentials);
    }
  }

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Name"
            value={credentials.name} onChange={handleChange}/>
        </Form.Group>
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
        <Form.Group controlId="passwordRepeat">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control type="password" name="passwordRepeat"
            placeholder="Repeat Password" value={credentials.passwordRepeat}
            onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
        Submit
        </Button>
      </Form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </>
  );
}

export default UserRegisterForm;
