"use client";

import { Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IDetailType } from "app/lib/interface/order";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function Page({ params }: { params: { list: number } }) {
  const router = useRouter();
  const { isSuccess, error, data } = useQuery<IDetailType[]>({
    queryKey: ["orderDetail"],
    queryFn: async () => {
      const res = await axios.get(`/api/order?id=${params.list}`);
      return res.data.data;
    },
  });
  const handleOnClick = (id: number) => {
    router.push(`/order/${params.list}/${id}`);
  };

  return (
    <div className="h-full">
      {isSuccess &&
        data?.map((v) => (
          <div
            className="flex items-end gap-5 px-3 py-6 border-b border-black border-dashed cursor-pointer"
            onClick={() => handleOnClick(v.id)}
            key={v.id}
            data-cy={`list_${v.id}`}
          >
            <Image src={`https://png.pngtree.com${v.image}`} width={70} height={70} alt="foodImage" />
            <div>
              <Rating name="read-only" value={v.rate} readOnly />
              <div className="flex gap-4">
                <span>{v.name}</span>
                <span>{v.price.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
