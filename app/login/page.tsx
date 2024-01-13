"use client";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 회원가입 정보 제출
  const handleOnSubmit = async () => {
    const body = { email: email, password: password };
    const response = await fetch("/api/login", { body: JSON.stringify(body), method: "POST" });
    console.log(response);
  };

  return (
    <div>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        value={"tpdms0401@naver.com"}
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
      <div data-testid="error-message">로그인 정보가 일치하지 않습니다.</div>
      <button onClick={handleOnSubmit}>로그인</button>
    </div>
  );
}
