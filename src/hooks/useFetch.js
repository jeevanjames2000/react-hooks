import React, { useEffect, useState } from "react";

export default function useFetch(url, method, body) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const resData = await response.json();
        setData(resData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(url, method, body);
  }, [url]);

  return { data, loading, error };
}
