import {LabelAPI, CreateLabelReq} from '../api/label';
import {useHistory} from 'react-router-dom';
import {useNotification} from '../context/Notification';
import LabelForm from '../forms/LabelForm';
import {createLabel} from '../redux/labels';
import {addSuccess, addFailure} from '../redux/notifications';
import {useAppSelector, useAppDispatch} from '../redux/hooks';

function LabelAdd(): JSX.Element {
  const history = useHistory();
  const dispatch = useAppDispatch();
  // const error = useAppSelector((state) => state.labels.error);

  // const {addSuccess, addFailure} = useNotification();

  // if (status === 'succeeded') {
  //   // dispatch(addSuccess(error));
  // }
  // else if (status === 'failed' && error) {
  //   dispatch(addFailure(error));
  // }

  async function handleCreateTask(task: CreateLabelReq) {
    const res = await dispatch(createLabel(task)).unwrap();
    if (!('error' in res)) {
      history.push('/');
    }
    // const res = await LabelAPI.createLabel(task);
    // if ('error' in res) {
    //   addFailure(res.error);
    // } else {
    //   addSuccess(res.message);
    //   history.push('/');
    // }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Add Label</h3>
      <LabelForm onSubmit={handleCreateTask} />
    </div>
  );
}

export default LabelAdd;
