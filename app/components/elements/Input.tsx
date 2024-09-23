interface InputType {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function Input(data: InputType) {
  const { label, id, type, value, onChange, placeholder } = data;

  return (
    <div className="flex items-center justify-between text-sm w-96">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        data-cy={id}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className="h-10 pl-3 border rounded-md outline-none min-w-64 focus-visible:outline-none placeholder:text-sm"
      />
    </div>
  );
}
