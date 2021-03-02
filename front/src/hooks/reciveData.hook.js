import { useCallback } from 'react';

export const useReciveData = () => {
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      try {
        const response = await fetch(url, {
          method,
          body: null,
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'something went wrong');
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
    []
  );

  return { request };
};
