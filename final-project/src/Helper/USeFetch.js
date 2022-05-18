import axios from "axios";
import { useEffect, useState } from "react";
const delay = () => {
  return new Promise((resolve) => setTimeout(() => resolve("delay"), 3000));
};

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        await delay();
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
};

export { useFetch };
