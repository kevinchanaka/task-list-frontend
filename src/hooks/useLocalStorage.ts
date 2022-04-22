// Code obtained from https://usehooks.com/useLocalStorage/
import {useState} from 'react';

type UseLocalStorageReturn<T> = readonly [T, (value: T) => void]

function useLocalStorage<T>(key: string, initialValue: T):
  UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) as T : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
