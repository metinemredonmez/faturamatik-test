import { useState } from "react";

interface UseFetchResult<T> {
  loading: boolean;
  data: T | undefined;
  error: Error | undefined;
}

type UseFetchFunction<T> = (adapter: (params: any | null) => Promise<{ data: T }>, params: any | null) => void;

const useFetch = <T>(): [UseFetchFunction<T>, UseFetchResult<T>] => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetch: UseFetchFunction<T> = (adapter, params) => {
    setLoading(true);
    adapter(params)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const result: UseFetchResult<T> = {
    loading,
    data,
    error,
  };

  return [fetch, result];
};

export default useFetch;