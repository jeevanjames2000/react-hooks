import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
export default function SWR() {
  const { mutate } = useSWRConfig();
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=30`,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 60000,
    }
  );
  const prefetchNextPage = () => {
    if (page < 30) {
      mutate(
        `https://jsonplaceholder.typicode.com/posts?_page=${page + 1}&_limit=10`
      );
    }
  };
  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };
  const addNewPost = async () => {
    const newPost = {
      title: "Optimistic Update",
      body: "This post was added optimistically.",
      userId: 1,
    };
    mutate(
      "https://jsonplaceholder.typicode.com/posts",
      [...data, newPost],
      false
    );
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", newPost);
      mutate("https://jsonplaceholder.typicode.com/posts");
    } catch (error) {
      console.error("Error adding post:", error);
      mutate("https://jsonplaceholder.typicode.com/posts");
    }
  };
  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>Posts</h1>
      <button onClick={addNewPost}>Add New Post (Optimistic)</button>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => goToPage(page + 1)} disabled={page === 10}>
          Next
        </button>
      </div>
      {}
      <button onMouseEnter={prefetchNextPage}>Prefetch Next Page</button>
    </div>
  );
}
