import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Props {
  endpoint: string;
  key: any[];
  params?: any;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Query {
  userId: number | undefined;
  pageSize: number;
}

const usePosts = (query: Query) => {
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<Post[], Error>({
      queryKey: [query],
      queryFn: ({ pageParam = 1 }) => {
        return axios
          .get<Post[]>(`https://jsonplaceholder.typicode.com/posts`, {
            params: {
              userId: query.userId,
              _limit: query.pageSize,
              _start: (pageParam - 1) * query.pageSize,
            },
          })
          .then((res) => res.data);
      },
      staleTime: 10 * 1000,
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length > 0 ? allPages.length + 1 : undefined;
      },
    });
  return { data, error, isLoading, fetchNextPage, isFetchingNextPage };
};

export default usePosts;
