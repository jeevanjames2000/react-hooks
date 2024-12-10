import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const fetchJobPostings = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};
export default function PreFetch() {
  const { data, isLoading, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: ["preFetch"],
    queryFn: fetchJobPostings,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    onSuccess: () => {
      console.log("Data fetched:", isFetching ? "New request" : "From cache");
    },
  });
  if (isLoading) return <p>Loading prefetched data...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>Prefetched Data</h1>
      <p>{isFetching ? "New data requested!" : "Data fetched from cache!"}</p>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
          </li>
        ))}
      </ul>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}
