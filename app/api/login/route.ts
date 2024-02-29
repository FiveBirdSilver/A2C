import { NextResponse } from "next/server";

// 함수명에는 Http method를 작성해야함!
export async function POST() {
  return NextResponse.json(
    {
      message: "SUCESS",
    },
    {
      status: 200,
    }
  );
}
