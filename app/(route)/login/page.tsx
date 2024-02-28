"use client"; //모듈이 클라이언트 번들의 일부로 간주
import { useEffect, useState } from "react";
import { useLogin } from "app/hooks/useLogin";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate, isError, isSuccess } = useLogin();

  const handleOnSubmit = async () => {
    await mutate({ email, password });
  };

  // useEffect(() => {
  //   if (isSuccess) router.push("/");
  // }, [isSuccess]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex gap-2">
        <label htmlFor="email">이메일</label>
        <input
          id="emailInput"
          //cypress는 data-cy 태그로 가져와서 테스트함
          data-cy="emailInput"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요"
          autoComplete="off"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="password">비밀번호</label>
        <input
          id="passwordInput"
          data-cy="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <button onClick={handleOnSubmit} data-cy="loginBtn">
        로그인
      </button>
    </div>
  );
}
