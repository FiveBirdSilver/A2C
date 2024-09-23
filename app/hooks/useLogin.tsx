import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface LoginResponse {
  email: string;
  password: string;
}

const login = (data: LoginResponse) => {
  const result = axios.post("/api/login", data);
  return result;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginResponse) => {
      return login(data);
    },
    onSuccess: (res) => {
      console.log(res);
      // handleOnSuccess();
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
