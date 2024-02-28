"use client";
import { useRouter } from "next/navigation";

//모듈이 클라이언트 번들의 일부로 간주
export default function Login() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <button onClick={() => router.push("/login")}>로그인</button>
      <button onClick={() => router.push("/register")}>회원가입</button>
    </div>
  );
}
