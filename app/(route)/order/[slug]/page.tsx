"use client";

export default function Page({ params }: { params: { slug: number } }) {
  return <div>{params.slug}</div>;
}
