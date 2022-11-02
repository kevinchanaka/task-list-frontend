import {useAuth} from '../context/Auth';
import {useHistory} from 'react-router-dom';
import {useNotification} from '../context/Notification';
import UserLoginForm from '../forms/UserLoginForm';
import {LoginUserReq} from '../api/user';

function UserLogin(): JSX.Element {
  const {loginUser} = useAuth();
  const {addFailure} = useNotification();
  const history = useHistory();

  async function handleUserLogin(credentials: LoginUserReq) {
    const res = await loginUser(credentials.email, credentials.password);
    if ('error' in res) {
      addFailure(res.error);
    } else {
      history.push('/');
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>User Login</h3>
      <UserLoginForm onSubmit={handleUserLogin} />
    </div>
  );
}


export default UserLogin;
