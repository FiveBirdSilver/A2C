"use client";
import { useState } from "react";

interface Idata {}
export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  // 회원가입 정보 제출
  const handleOnSubmit = async (data: Idata) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
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
          placeholder="비밀번호를 입력해주세요 (8 ~ 20자의 영문, 숫자, 특수문자 조합)"
        />
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          id="confirmPassword"
          type="password"
          value={passwordConfirm}
          placeholder="비밀번호를 한 번 더 입력해주세요"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <div data-testid="error-message">비밀번호와 비밀번호 확인이 일치하지 않습니다.</div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
