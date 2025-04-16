import { useEffect, useState } from "react";

function useFetchData(apiEndpoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint, {
          headers: {
            Accept: "application/json", // Explicitly request JSON
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAlldata(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setAlldata([]);
      } finally {
        setLoading(false);
      }
    };

    if (apiEndpoint) {
      fetchAllData();
    }
  }, [apiEndpoint]);

  return { alldata, loading, error };
}

export default useFetchData;
