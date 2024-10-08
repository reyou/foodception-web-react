import { useState, useEffect } from 'react';
import HttpProvider from '../providers/HttpProvider';

interface UseFetchResult {
  data: any;
  loading: boolean;
  error: string | null;
}

const BASE_URL = process.env.REACT_APP_API_URL;

function useFetch(url: string): UseFetchResult {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullUrl = `${BASE_URL}${url}`;
        const response = await HttpProvider.get(fullUrl);
        setData(response);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error } as UseFetchResult;
}

export default useFetch;
