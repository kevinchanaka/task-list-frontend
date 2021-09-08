import {useState, useEffect} from 'react';
import useNotification from './useNotification';

function useDataLoader(callback, args = {}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [loaded, setLoaded] = useState(false);
  const {addFailure, networkErrorMessage} = useNotification();

  useEffect(async () => {
    const fetchedData = await callback(args);
    if (!fetchedData.error) {
      setData(fetchedData);
      setLoaded(true);
    } else if (fetchedData.error.message == 'Network Error') {
      setLoaded(true);
      console.log(fetchedData.error);
      setError(networkErrorMessage);
      addFailure(networkErrorMessage);
    } else {
      setLoaded(true);
      setError(fetchedData.error.response.data.message);
      addFailure(fetchedData.error.response.data.message);
    }
  }, []);

  return Object.freeze({
    data,
    error,
    loaded,
  });
}

export default useDataLoader;
