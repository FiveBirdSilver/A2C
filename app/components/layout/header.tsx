"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/");
  };
  return (
    <div className="fixed top-0 w-full border-b border-gray-200">
      <div className="flex items-center h-16 gap-3 mx-auto my-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl font-PretendardM">
        <Image src={"/logo.jpeg"} width={30} height={30} alt="logo" />
        <Image src={"/logo_text.jpeg"} width={50} height={15} alt="logo" />
      </div>
    </div>
  );
}
