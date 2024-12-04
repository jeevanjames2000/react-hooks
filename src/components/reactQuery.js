import React, { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchPosts = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`
  );
  return data;
};
export default function ReactQuery() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.length > 0 && nextPage <= 10 ? nextPage : undefined;
    },
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
  });
  const observer = useRef();
  const lastPostRef = React.useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>Posts</h1>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.map((post, index) => {
              if (
                data.pages.length - 1 === pageIndex &&
                page.length - 1 === index
              ) {
                return (
                  <div
                    key={post.id}
                    ref={lastPostRef}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      marginBottom: "10px",
                    }}
                  >
                    <strong>{post.title}</strong>
                  </div>
                );
              }
              return (
                <div
                  key={post.id}
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    marginBottom: "10px",
                  }}
                >
                  <strong>{post.title}</strong>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      {isFetchingNextPage && <p>Loading more posts...</p>}
      {!hasNextPage && <p>No more posts to load.</p>}
    </div>
  );
}
