import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json(
    {
      message: "ERROR TEST",
    },
    {
      status: 200,
    }
  );
}
