import { useHistory } from "react-router-dom";
import UserRegisterForm from "components/forms/UserRegisterForm";
import { RegisterUserReq } from "api/interfaces";
import { useRegisterUserMutation } from "redux/api";

export default function UserRegister() {
  const history = useHistory();
  const [registerUser] = useRegisterUserMutation();

  async function handleUserRegister(credentials: RegisterUserReq) {
    const res = await registerUser(credentials);
    if ("data" in res) {
      history.push("/login");
    }
  }

  return (
    <>
      <h3>User Registration</h3>
      <UserRegisterForm onSubmit={handleUserRegister} />
    </>
  );
}
