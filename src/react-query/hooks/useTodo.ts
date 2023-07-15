import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useData from "./useData";
import { CACHE_KEY_TODOS } from "../constants";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodo = () => {
  return useData<Todo[]>({ endpoint: "/todos", key: CACHE_KEY_TODOS });
};

export default useTodo;
