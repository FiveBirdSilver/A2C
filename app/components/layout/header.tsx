"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/");
  };
  return (
    <div className="fixed top-0 flex content-center w-full px-2 py-3 mb-4 bg-black font-PretendardM">
      <span className="text-white cursor-pointer" onClick={handleOnClick}>
        FIVEBIRDSILVER
      </span>
    </div>
  );
}
