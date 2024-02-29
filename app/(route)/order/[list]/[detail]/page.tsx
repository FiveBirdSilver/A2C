"use client";

export default function Page({ params }: { params: { detail: number } }) {
  return <div>{params.detail}</div>;
}
