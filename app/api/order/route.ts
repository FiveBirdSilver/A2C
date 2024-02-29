import { NextResponse } from "next/server";

export async function GET() {
  console.log("-----REQUEST------");
  const result = [
    {
      id: 1,
      name: "샌드위치",
      image: "sandwich",
    },
    {
      id: 2,
      name: "피자",
      image: "pizza",
    },
    {
      id: 3,
      name: "커피",
      image: "coffee",
    },
    {
      id: 4,
      name: "도넛",
      image: "donut",
    },
  ];
  return NextResponse.json(
    {
      message: "OK",
      data: result,
    },
    {
      status: 200,
    }
  );
}
