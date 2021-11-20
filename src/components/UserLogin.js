import {useAuth} from '../context/Auth';
import {useHistory} from 'react-router-dom';
import {useNotification} from '../context/Notification';
import UserLoginForm from '../forms/UserLoginForm';

function UserLogin(props) {
  const {loginUser} = useAuth();
  const {addFailure} = useNotification();
  const history = useHistory();

  async function userLogin(credentials) {
    const res = await loginUser(credentials.email, credentials.password);
    if (res) {
      history.push('/');
    } else {
      // TODO: need to fix error message here
      addFailure('Incorrect username or password');
    }
  }

  return (
    <div className="ml-5 mr-5">
      <br />
      <h3>User Login</h3>
      <UserLoginForm onSubmit={userLogin} />
    </div>
  );
}


export default UserLogin;
