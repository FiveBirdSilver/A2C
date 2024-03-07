"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/");
  };
  return (
    <div className="absolute flex content-center w-full px-2 py-2 mb-4 bg-black">
      <span className="text-white cursor-pointer" onClick={handleOnClick}>
        FIVEBIRDSILVER
      </span>
    </div>
  );
}
