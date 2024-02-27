import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const login = (data: any) => {
  const result = axios.post("/api/login", data);
  return result;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return login(data);
    },
    onSuccess: (res) => {
      // console.log(res);
      // handleOnSuccess();
    },
    onError: (err) => {
      // console.log(err);
    },
  });
};
