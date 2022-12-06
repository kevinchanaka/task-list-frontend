import {LabelAPI, CreateLabelReq} from '../api/label';
import {useHistory} from 'react-router-dom';
import {useNotification} from '../context/Notification';
import LabelForm from '../forms/LabelForm';

function LabelAdd(): JSX.Element {
  const history = useHistory();
  const {addSuccess, addFailure} = useNotification();

  async function handleCreateTask(task: CreateLabelReq) {
    const res = await LabelAPI.createLabel(task);
    if ('error' in res) {
      addFailure(res.error);
    } else {
      addSuccess(res.message);
      history.push('/');
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Add Label</h3>
      <LabelForm onSubmit={handleCreateTask} />
    </div>
  );
}

export default LabelAdd;
