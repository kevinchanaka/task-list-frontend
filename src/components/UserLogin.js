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
    if (!res.error) {
      history.push('/');
    } else {
      addFailure(res.error);
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>User Login</h3>
      <UserLoginForm onSubmit={userLogin} />
    </div>
  );
}


export default UserLogin;
