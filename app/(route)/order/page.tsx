"use client"; //모듈이 클라이언트 번들의 일부로 간주

import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { IOrderType } from "app/lib/interface/order";
import List from "app/components/elements/list";

export default function Page() {
  const router = useRouter();
  const { isSuccess, error, data } = useQuery<IOrderType[]>({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axios.get("/api/order");
      return res.data.data;
    },
  });

  const handleOnClick = (id: number) => {
    router.push(`/order/${id}`);
  };

  return (
    <div className="flex content-center justify-center h-full gap-10">
      {isSuccess &&
        data?.map((v) => (
          <List onClick={() => handleOnClick(v.id)}>
            <Image src={`/${v.image}.png`} width={50} height={50} alt={v.image} />
            <span>{v.name}</span>
          </List>
        ))}
    </div>
  );
}
