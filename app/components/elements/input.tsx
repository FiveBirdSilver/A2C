import { Dispatch, SetStateAction } from "react";

interface IinputType {
  label: string;
  id: string;
  testId?: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function Input(data: IinputType) {
  const { label, id, type, value, onChange, placeholder } = data;

  return (
    <div className="flex items-center justify-between gap-4 w-96">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        data-cy={id}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className="h-10 pl-3 border border-gray-700 rounded min-w-72 w-72 focus-visible:outline-none"
      />
    </div>
  );
}
