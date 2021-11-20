import {useAuth} from '../context/Auth';
import {useHistory} from 'react-router-dom';
import {useNotification} from '../context/Notification';
import UserRegisterForm from '../forms/UserRegisterForm';

function UserRegister(props) {
  const {addFailure, addSuccess} = useNotification();
  const {registerUser} = useAuth();
  const history = useHistory();

  async function userRegister(credentials) {
    const res = await registerUser(credentials.name, credentials.email,
        credentials.password);
    if (res.error) {
      addFailure(res.error.response.data.message);
    } else {
      addSuccess('User registered successfully');
      history.push('/login');
    }
  }

  return (
    <div className="ml-5 mr-5">
      <br />
      <h3>User Registration</h3>
      <UserRegisterForm onSubmit={userRegister}/>
    </div>
  );
}

export default UserRegister;
