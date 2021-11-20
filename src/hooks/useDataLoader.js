import {useState, useEffect} from 'react';
import {useNotification} from '../context/Notification';

function useDataLoader(callback, args = {}) {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loaded, setLoaded] = useState(false);
  const {addFailure, networkErrorMessage} = useNotification();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const res = await callback(args);
      if (isMounted && res) {
        if (!res.error) {
          setData(res);
          setLoaded(true);
        } else if (res.error.message == 'Network Error') {
          setError(networkErrorMessage);
          addFailure(networkErrorMessage);
          setLoaded(true);
        } else if (res.error && res.error.response) {
          if (res.error.response.status != 401) {
            setError(res.error.response.data.message);
            addFailure(res.error.response.data.message);
          }
          setLoaded(true);
        } else {
          setLoaded(true);
          setError('An unknown error occurred');
          addFailure('An unknown error occurred');
        }
      }
    })();

    return function() {
      isMounted = false;
    };
  }, []);

  return Object.freeze({
    data,
    error,
    loaded,
  });
}

export default useDataLoader;
