import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useData from "./useData";
import { CACHE_KEY_TODOS } from "../constants";
import ApiClient from "../services/ApiClient";
import todoService, { Todo } from "../services/todoService";

const useTodo = () => {
  const { data, error, isLoading } = useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    staleTime: 10 * 1000,
    keepPreviousData: true,
  });
  return { data, error, isLoading };
};

export default useTodo;
