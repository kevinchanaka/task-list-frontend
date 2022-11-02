import {useAuth} from '../context/Auth';
import {useHistory} from 'react-router-dom';
import {useNotification} from '../context/Notification';
import UserRegisterForm from '../forms/UserRegisterForm';
import {RegisterUserReq} from '../api/user';

function UserRegister(): JSX.Element {
  const {addFailure, addSuccess} = useNotification();
  const {registerUser} = useAuth();
  const history = useHistory();

  async function handleUserRegister(credentials: RegisterUserReq) {
    const res = await registerUser(credentials.name, credentials.email,
      credentials.password);
    if ('error' in res) {
      addFailure(res.error);
    } else {
      addSuccess('User registered successfully');
      history.push('/login');
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>User Registration</h3>
      <UserRegisterForm onSubmit={handleUserRegister} />
    </div>
  );
}

export default UserRegister;
