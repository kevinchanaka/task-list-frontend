import LabelForm from '../forms/LabelForm';
import {useHistory, useParams} from 'react-router-dom';
import {CreateLabelReq, LabelAPI, LabelParams} from '../api/label';
import {useNotification} from '../context/Notification';

function LabelEdit(): JSX.Element {
  const history = useHistory<CreateLabelReq>();
  const {id} = useParams<LabelParams>();
  const {addSuccess, addFailure} = useNotification();

  async function handleLabelSubmit(label: CreateLabelReq) {
    const res = await LabelAPI.modifyLabel({id: id, ...label});
    if ('error' in res) {
      addFailure(res.error);
    } else {
      addSuccess(res.message);
      history.push('/labels');
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Edit Label</h3>
      <LabelForm onSubmit={handleLabelSubmit}
        label={history.location.state ? {...history.location.state} : undefined} />
    </div>
  );
}

export default LabelEdit;
