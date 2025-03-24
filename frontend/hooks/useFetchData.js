import { useEffect, useState } from "react";
function useFetchData(apiEndpoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchAllData = async () => {
      try {
        const res = await fetch(apiEndpoint);
        const alldata = res.data;
        setAlldata(alldata);
        console.log("Fetched Data:", res.data); // Debugging
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    // fetch blog data only
    if (apiEndpoint) {
      fetchAllData();
    }
  }, [initialLoad, apiEndpoint]);
  return { alldata, loading };
}
export default useFetchData;
