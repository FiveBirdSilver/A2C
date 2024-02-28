"use client"; //모듈이 클라이언트 번들의 일부로 간주

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Button from "app/components/button";
import { IButtonType } from "app/lib/interface/order";

export default function Page() {
  const { isSuccess, error, data } = useQuery<IButtonType[]>({
    queryKey: ["list"],
    queryFn: () => axios.get("/api/order"),
  });
  return data?.map((v) => <Button id={v.id} name={v.name} image={v.image} />);
}
