import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useData from "./useData";
import UserDetailPage from "../../routing/UserDetailPage";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Query {
  userId: number | undefined;
  page: number;
  pageSize: number;
}

const usePost = (query: Query) => {
  return useData<Post[]>({
    endpoint: "/posts",
    key: [query],
    params: {
      userId: query.userId,
      _limit: query.pageSize,
      _start: (query.page - 1) * query.pageSize,
    },
  });
};

export default usePost;
