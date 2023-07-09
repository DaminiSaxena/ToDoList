import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useData from "./useData";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodo = () => {
  return useData<Todo[]>({ endpoint: "/todos", key: ["todo"] });
};

export default useTodo;
