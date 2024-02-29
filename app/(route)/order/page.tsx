"use client"; //모듈이 클라이언트 번들의 일부로 간주

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Button from "app/components/elements/button";
import { IButtonType } from "app/lib/interface/order";

export default function Page() {
  const { isSuccess, error, data } = useQuery<IButtonType[]>({
    queryKey: ["order"],
    queryFn: async () => {
      const res = await axios.get("/api/order");
      return res.data.data;
    },
  });
  return (
    <div className="flex content-center justify-center gap-10">
      {isSuccess && data?.map((v) => <Button id={v.id} name={v.name} image={v.image} />)}
    </div>
  );
}
