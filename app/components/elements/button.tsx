import { IButtonType } from "app/lib/interface/order";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Button(data: IButtonType) {
  const router = useRouter();
  const handleOnClick = (id: number) => {
    router.push(`/order/${id}`);
  };

  return (
    <div
      key={data.id}
      className="flex flex-col items-center justify-center gap-3 cursor-pointer"
      onClick={() => handleOnClick(data.id)}
      data-cy={`button_${data.id}`}
    >
      <Image src={`/${data.image}.png`} width={50} height={50} alt={data.image} />
      <span>{data.name}</span>
    </div>
  );
}
