"use client"; //모듈이 클라이언트 번들의 일부로 간주

import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { User } from "app/Interfaces/user.ts";
import { useLogin } from "app/hooks/useLogin";
import { Input } from "app/components/ui/input";
import { Label } from "app/components/ui/label";
import { Button } from "app/components/ui/button";

type Action = { type: "SET_EMAIL"; payload: string } | { type: "SET_PASSWORD"; payload: string };

// 리듀서 함수 정의
const reducer = (state: User, action: Action): User => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export default function Page() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, { email: "", password: "" });
  const [errMsg, setErrMsg] = useState<string>("");
  const { mutate, isError, isSuccess } = useLogin();

  useEffect(() => {
    if (isSuccess) router.push("/");
  }, [isSuccess]);

  const handleOnSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(state.email)) setErrMsg("올바른 이메일 형식이 아닙니다.");
    else await mutate({ email: state.email, password: state.password });
  };

  // const LogInOnGoogle = () => {};
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-5 min-w-96 ">
        <div className="flex w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            value={state.email}
            onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
          />
        </div>
        <div className="flex w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="passwordInput"
            type="password"
            value={state.password}
            onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: e.target.value })}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        {/* <p className="mt-2 ml-24 text-xs text-red-500">{errMsg}</p> */}
        <Button
          variant="active"
          onClick={handleOnSubmit}
          data-cy="loginBtn"
          disabled={state.email !== "" && state.password !== ""}
        >
          로그인
        </Button>
        {/* <Button variant="default" onClick={handleOnSubmit}>
          <Image src="/google.svg" width={20} height={20} alt="google" className="mx-2" onClick={() => LogInOnGoogle} />
          Google 계정으로 계속하기
        </Button> */}
      </div>
    </div>
  );
}
