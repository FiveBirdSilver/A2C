"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/");
  };
  return (
    <div className="fixed top-0 w-full border-b border-gray-200">
      <div className="flex items-center h-16 mx-auto my-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl font-PretendardM">
        <span className="text-black cursor-pointer" onClick={handleOnClick}>
          A2C
        </span>
      </div>
    </div>
  );
}
