import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = useCallback(
    async (url, method = 'POST', body = null, headers = {}) => {
      setLoading(true);

      try {
        const response = await fetch(url, {
          method,
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'something went wrong');
        }
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  return { loading, request, error };
};
