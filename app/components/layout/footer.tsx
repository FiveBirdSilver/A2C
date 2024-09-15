"use client";
import { FiUser, FiMapPin } from "react-icons/fi";
import { GrHomeRounded } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="fixed bottom-0 w-full border-t border-gray-100 bg-gray-50">
      <div className="flex items-center justify-between pl-8 pr-10 mx-auto mt-2 text-lg text-gray-600 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl font-PretendardR">
        <div className="flex flex-col items-center">
          <FiMapPin />
          <span style={{ fontSize: 9 }}>FACILITIES</span>
        </div>
        <div className="flex flex-col items-center">
          <GrHomeRounded />
          <span style={{ fontSize: 9 }}>HOME</span>
        </div>
        <div className="flex flex-col items-center">
          <FaRegUser />
          <span style={{ fontSize: 9 }}>MY</span>
        </div>
      </div>
    </div>
  );
}
