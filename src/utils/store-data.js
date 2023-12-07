import { useEffect, useState } from "react";

function useFetchStoreData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Promise.all([
          fetch(
            "https://fakestoreapi.com/products/category/men's clothing?size=200",
            {
              mode: "cors",
            },
          ),
          fetch(
            "https://fakestoreapi.com/products/category/women's clothing?size=200",
            {
              mode: "cors",
            },
          ),
        ]);

        response.forEach((res) => {
          if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
          }
        });

        const result = await Promise.all(response.map((res) => res.json()));

        setData(result.reduce((acc, cur) => [...acc, ...cur], []));
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    let ignore = false;

    if (!ignore) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, []);

  return { data, error, loading };
}

export default useFetchStoreData;
