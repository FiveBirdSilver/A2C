import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams.get("id");
  const orderList = [
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

  const detailList = [
    {
      id: 1,
      name: "아메리카노",
      image:
        "/png-clipart/20200225/original/pngtree-espresso-coffee-illustration-vector-on-white-background-png-image_5287370.jpg",
      rate: 5.0,
      price: 4100,
    },
    {
      id: 2,
      name: "카페라떼",
      image:
        "/png-clipart/20200225/original/pngtree-espresso-coffee-illustration-vector-on-white-background-png-image_5287370.jpg",
      rate: 2.0,
      price: 4600,
    },
    {
      id: 3,
      name: "카페모카",
      image:
        "/png-clipart/20200225/original/pngtree-espresso-coffee-illustration-vector-on-white-background-png-image_5287370.jpg",
      rate: 3.8,
      price: 5100,
    },
    {
      id: 4,
      name: "아인슈페너",
      image:
        "/png-clipart/20200225/original/pngtree-espresso-coffee-illustration-vector-on-white-background-png-image_5287370.jpg",
      rate: 4.0,
      price: 5400,
    },
  ];

  if (params === null) {
    return NextResponse.json(
      {
        message: "OK",
        data: orderList,
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        message: "OK",
        data: detailList,
      },
      {
        status: 200,
      }
    );
  }
}
