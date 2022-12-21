import {useState, useEffect} from 'react';
import {useNotification} from '../context/Notification';

type Callback<T> = () => Promise<T | {error: string}>
type UseDataLoaderReturn<T> = Readonly<{
  data: T | undefined,
  error: string | undefined,
  loaded: boolean
}>

function useDataLoader<T>(callback: Callback<T>): UseDataLoaderReturn<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [loaded, setLoaded] = useState(false);
  const {addFailure} = useNotification();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const res = await callback();

      if (isMounted && res) {
        // @ts-ignore Disabling TS here due to potential bug https://github.com/microsoft/TypeScript/issues/51007
        if ('error' in res) {
          setError(res.error);
          addFailure(res.error);
        } else {
          setData(res);
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
