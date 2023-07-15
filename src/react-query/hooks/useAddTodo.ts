import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Todo } from "./useTodo";
import { CACHE_KEY_TODOS } from "../constants";
import ApiClient from "../services/ApiClient";

interface TodoContext {
  previousTodo: Todo[];
}

export const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const apiClient = new ApiClient<Todo>("/todos");
  const addTodo = useMutation<Todo, Error, Todo, TodoContext>({
    mutationFn: (todo: Todo) => apiClient.post(todo),
    onMutate: (newTodo) => {
      const previousTodo = queryClient.getQueryData(["todo"]);
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => [
        newTodo,
        ...(todos || []),
      ]);
      onAdd();
      return { previousTodo };
    },
    onSuccess: (addedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? addedTodo : todo))
      );
    },
    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData(CACHE_KEY_TODOS, (todos) => [
        ...(context?.previousTodo || []),
      ]);
    },
  });
  return [addTodo];
};
