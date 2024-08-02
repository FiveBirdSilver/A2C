import cn from "classnames";

interface ButtonType {
  text: string;
  variant: "fill" | "outline";
  disabled?: boolean;
  onClick: () => void;
}

export default function Button(data: ButtonType) {
  const { variant, text, disabled, onClick } = data;

  const colorVariants = {
    defalut: "",
    fill: "bg-green-400 text-white",
    outline: "bg-transparent text-green-400 border-green-400 border",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(colorVariants[variant], "w-full h-10 rounded cursor-pointer text-sm")}
    >
      {text}
    </button>
  );
}
