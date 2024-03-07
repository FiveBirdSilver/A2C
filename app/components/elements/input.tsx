import { IinputType } from "app/lib/interface/element";

export default function Input(data: IinputType) {
  const { label, id, type, value, setState, placeholder } = data;

  return (
    <div className="flex items-center justify-between gap-4 w-96">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => setState(e.target.value)}
        data-cy={id}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className="h-10 pl-3 border border-gray-700 rounded min-w-72 w-72 focus-visible:outline-none"
      />
    </div>
  );
}
