import { IinputType } from "app/lib/interface/element";

export default function Input(data: IinputType) {
  const { label, id, type, value, setState, placeholder } = data;

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => setState(e.target.value)}
        data-cy={id}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}
