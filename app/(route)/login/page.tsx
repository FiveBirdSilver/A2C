"use client"; //모듈이 클라이언트 번들의 일부로 간주
import { useEffect, useState } from "react";
import { useLogin } from "app/hooks/useLogin";
import { useRouter } from "next/navigation";

import Input from "app/components/elements/input";
interface IErrMsg {
  email?: string;
  password?: string;
}

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errMsg, setErrMsg] = useState<IErrMsg>({ email: "", password: "" });
  const [disabled, setDisabled] = useState<boolean>(true);
  const { mutate, isError, isSuccess } = useLogin();

  useEffect(() => {
    if (isSuccess) router.push("/");
  }, [isSuccess]);

  // 아이디 , 비밀번호 빈 값 검사
  useEffect(() => {
    if (email !== "" && password !== "") setDisabled(false);
    else setDisabled(true);
  }, [email, password]);

  const handleOnSubmit = async () => {
    if (!email.includes("@")) setErrMsg({ email: "올바른 이메일 형식이 아닙니다." });
    else await mutate({ email, password });
  };

  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-5">
        <div>
          <Input
            label="이메일"
            id="emailInput"
            type="email"
            value={email}
            setState={setEmail}
            placeholder="이메일을 입력해주세요"
          />
          <p className="mt-2 ml-24 text-xs text-red-500">{errMsg.email}</p>
        </div>
        <Input
          label="비밀번호"
          id="passwordInput"
          type="password"
          value={password}
          setState={setPassword}
          placeholder="비밀번호를 입력해주세요"
        />
        <button
          onClick={handleOnSubmit}
          data-cy="loginBtn"
          disabled={disabled}
          className="w-full h-10 mt-5 text-white bg-black rounded disabled:opacity-30 "
        >
          로그인
        </button>
      </div>
    </div>
  );
}
