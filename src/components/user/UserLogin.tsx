import { useHistory } from "react-router-dom";
import UserLoginForm from "components/forms/UserLoginForm";
import { LoginUserReq } from "api/interfaces";
import { useLoginUserMutation } from "redux/api";
import { loginUser } from "redux/auth";
import { useAppDispatch } from "hooks";

export default function UserLogin() {
  const history = useHistory();
  const [loginUserApi] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  async function handleUserLogin(credentials: LoginUserReq) {
    const res = await loginUserApi(credentials);
    if ("data" in res) {
      dispatch(loginUser());
      history.push("/tasks");
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>User Login</h3>
      <UserLoginForm onSubmit={handleUserLogin} />
    </div>
  );
}
