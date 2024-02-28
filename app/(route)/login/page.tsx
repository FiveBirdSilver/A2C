"use client"; //모듈이 클라이언트 번들의 일부로 간주
import { useState } from "react";
import { useLogin } from "app/hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate, isError, isSuccess } = useLogin();

  const handleOnSubmit = async () => {
    await mutate({ email, password });
  };

  return (
    <div>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력해주세요"
        autoComplete="off"
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
      />
      {isError && <div data-testid="error-message">로그인 정보가 일치하지 않습니다.</div>}
      <button onClick={handleOnSubmit}>로그인</button>
    </div>
  );
}
