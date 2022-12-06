import Row from 'react-bootstrap/Row';
import {Link} from 'react-router-dom';
import useDataLoader from '../hooks/useDataLoader';
import LoadingSpinner from './LoadingSpinner';
import LabelCard from './LabelCard';
import {Label, LabelAPI} from '../api/label';

function LabelList(): JSX.Element {
  const {data, error, loaded} = useDataLoader(LabelAPI.getLabels);

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Labels</h3>
      <LoadingSpinner loaded={loaded} error={error}>
        {data && data.labels && data.labels.length > 0 ?
          <Row xs={1} md={2} className="g-4">
            {data.labels.map((data: Label) => {
              return (
                <LabelCard key={data.id} label={data} />
              );
            })}
          </Row> :
          <div>
            No labels have been added,
            click <Link to="/add-label">here</Link> to add a new label
          </div>
        }
      </LoadingSpinner>
    </div>
  );
}


export default LabelList;
