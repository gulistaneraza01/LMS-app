import axios from "axios";
import { useEffect, useState } from "react";

function useFetch({ url }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const { data } = await axios.get(url, { signal: controller.signal });
        setData(data);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);
  return { data, isLoading, isError };
}

export default useFetch;
