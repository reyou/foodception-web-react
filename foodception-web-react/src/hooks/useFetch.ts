import { useState, useEffect } from 'react';
import HttpProvider from '../providers/HttpProvider';

interface UseFetchResult {
  data: any;
  loading: boolean;
  error: string | null;
}

const BASE_API_URL = process.env.REACT_APP_API_URL;

function useFetch(url: string): UseFetchResult {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when URL changes
    setLoading(true); // Reset loading to true
    setError(null); // Reset error state
    setData(null); // Optionally reset data (if needed)
    const fetchData = async () => {
      try {
        const fullUrl = `${BASE_API_URL}${url}`;
        const response = await HttpProvider.get(fullUrl);
        setData(response); // Update data on success
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // Set error message
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false); // Set loading to false when fetch completes
      }
    };

    fetchData();
  }, [url]); // Effect runs whenever `url` changes

  return { data, loading, error };
}

export default useFetch;
