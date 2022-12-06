import {LabelAPI, LabelParams} from '../api/label';
import {useHistory, useParams} from 'react-router-dom';
import useDataLoader from '../hooks/useDataLoader';
import LoadingSpinner from './LoadingSpinner';
import LabelBox from './LabelBox';
import Button from 'react-bootstrap/Button';
import {useNotification} from '../context/Notification';


function LabelInfo(): JSX.Element {
  const {id} = useParams<LabelParams>();
  const history = useHistory();
  const {data, error, loaded} = useDataLoader(() => LabelAPI.getLabel(id));
  const {addSuccess, addFailure} = useNotification();

  function handleEditClick() {
    if (data) {
      history.push(`/edit-label/${id}`, {
        name: data.label.name,
        colour: data.label.colour,
      });
    }
  }

  async function handleDeleteClick() {
    const res = await LabelAPI.removeLabel(id);
    if ('error' in res) {
      addFailure(res.error);
    } else {
      addSuccess(res.message);
      history.push('/labels');
    }
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h2>Label Information</h2>
      <LoadingSpinner error={error} loaded={loaded}>
        {data && data.label ?
          <>
            <p><b>ID: </b>{data.label.id}</p>
            <p><b>Name: </b>{data.label.name}</p>
            <b>Colour: </b><LabelBox colour={data.label.colour} /><p></p>
            <p><b>Created at: </b>{data.label.createdAt}</p>
            <p><b>Updated at: </b>{data.label.updatedAt}</p>
            <Button className="mr-2" onClick={handleEditClick}>Edit Label</Button>
            <Button variant="danger" onClick={handleDeleteClick}>Delete Label</Button>
          </> :
          <></>
        }
      </LoadingSpinner>
    </div>
  );
}

export default LabelInfo;
