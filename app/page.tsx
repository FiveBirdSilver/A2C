"use client";
import { useRouter } from "next/navigation";

//모듈이 클라이언트 번들의 일부로 간주
export default function Login() {
  const router = useRouter();

  return <div className="flex flex-col items-center gap-5"></div>;
}
