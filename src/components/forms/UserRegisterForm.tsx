import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FormControlElement } from "interfaces";
import { RegisterUserReq } from "api/interfaces";
import { useAppDispatch } from "hooks";
import { addFailure } from "redux/notifications";
import { NAME_LENGTH, DEFAULT_LENGTH } from "config";
import Joi from "joi";

const userRegisterSchema = Joi.object({
  name: Joi.string().required().max(NAME_LENGTH),
  password: Joi.string().required().max(DEFAULT_LENGTH),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .max(NAME_LENGTH),
});

interface UserRegisterFormProps {
  onSubmit: (credentials: RegisterUserReq) => Promise<void>;
}

export default function UserRegisterForm(props: UserRegisterFormProps) {
  const [credentials, setCredentials] = useState(() => {
    return {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    };
  });
  const dispatch = useAppDispatch();

  function handleChange(event: React.ChangeEvent<FormControlElement>) {
    setCredentials((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (credentials.password != credentials.passwordRepeat) {
      dispatch(addFailure("Passwords do not match"));
      return;
    }
    const data = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    };
    const { error } = userRegisterSchema.validate(data);
    if (error) {
      dispatch(addFailure(error.message));
    } else {
      await props.onSubmit(data);
    }
  }

  return (
    <>
      <div style={{ maxWidth: "768px" }}>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={credentials.name}
              autoComplete="off"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              autoComplete="off"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="passwordRepeat">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              name="passwordRepeat"
              placeholder="Repeat Password"
              value={credentials.passwordRepeat}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </>
  );
}
