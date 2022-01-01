import {useState, useEffect} from 'react';
import {useNotification} from '../context/Notification';

function useDataLoader(callback, args = {}) {
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loaded, setLoaded] = useState(false);
  const {addFailure} = useNotification();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const res = await callback(args);
      if (isMounted && res) {
        if (!res.error) {
          setData(res);
        } else {
          setError(res.error);
          addFailure(res.error);
        }
        setLoaded(true);
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
