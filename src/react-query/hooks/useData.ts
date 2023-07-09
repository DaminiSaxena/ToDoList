import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface Props {
  endpoint: string;
  key: any[];
  params?: any;
}
const useData = <T>({ endpoint, key, params }: Props) => {
  const fetchData = () => {
    return axios
      .get<T>(`https://jsonplaceholder.typicode.com${endpoint}`, {
        params: params,
      })
      .then((res) => res.data);
  };
  const { data, error, isLoading } = useQuery<T, Error>({
    queryKey: key,
    queryFn: fetchData,
    staleTime: 10 * 1000,
    keepPreviousData: true,
  });
  return { data, error, isLoading };
};

export default useData;
