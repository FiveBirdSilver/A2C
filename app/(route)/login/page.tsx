"use client"; //모듈이 클라이언트 번들의 일부로 간주

import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";

import { User } from "app/Interfaces/user.ts";
import { useLogin } from "app/hooks/useLogin";
import Input from "app/components/elements/Input";
import Button from "app/components/elements/Button";
import axios from "axios";
import Image from "next/image";

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

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-5 mb-8 min-w-80">
        <Image src={"/logo_text.jpeg"} width={100} height={30} alt="logo" />
        <div className="flex w-full max-w-sm items-center gap-1.5">
          <Input
            label="이메일"
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            value={state.email}
            onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
          />
        </div>
        <div className="flex w-full max-w-sm items-center gap-1.5">
          <Input
            label="비밀번호"
            id="passwordInput"
            type="password"
            value={state.password}
            onChange={(e) => dispatch({ type: "SET_PASSWORD", payload: e.target.value })}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <div className="flex flex-col w-full gap-5 mt-5 text-">
          <Button
            variant="fill"
            onClick={handleOnSubmit}
            disabled={!(state.email !== "" && state.password !== "")}
            text="로그인"
          />
          <div className="relative pt-10 mt-5 border-t border-gray-200">
            <p className="absolute text-sm text-center text-gray-500 -top-3 left-40 min-w-16 bg-body">또는</p>
            <Button variant="outline" onClick={handleOnSubmit} text="회원가입" />
          </div>
        </div>
      </div>
    </div>
  );
}
