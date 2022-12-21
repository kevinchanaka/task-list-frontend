import Row from 'react-bootstrap/Row';
import {Link} from 'react-router-dom';
import useDataLoader from '../hooks/useDataLoader';
import LoadingSpinner from './LoadingSpinner';
import Spinner from 'react-bootstrap/Spinner';
import LabelCard from './LabelCard';
import {Label, LabelAPI} from '../api/label';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {useEffect} from 'react';
import {getLabels} from '../redux/labels';
import {useGetLabelsQuery} from '../redux/api';

function LabelList(): JSX.Element {
  // const {data, error, loaded} = useDataLoader(LabelAPI.getLabels);

  const {
    data: labels,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetLabelsQuery();

  // const dispatch = useAppDispatch();
  // const labels = useAppSelector((state) => state.labels.items);
  // const {status, error} = useAppSelector((state) => state.labels);
  // let loaded = false;

  // if (status != 'loading') {
  //   loaded = true;
  // }

  // useEffect(() => {
  //   dispatch(getLabels());
  // }, []);


  if (isLoading) {
    return <Spinner animation="border" />;
  } else if (isSuccess) {
    return (
      <div className="ml-5 mr-5 mt-3">
        <h3>Labels</h3>
        {labels.labels.length > 0 ?
          <Row xs={1} md={2} className="g-4">
            {labels.labels.map((data: Label) => {
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
      </div>
    );
  } else {
    return <div>Error</div>;
  }
}


export default LabelList;
