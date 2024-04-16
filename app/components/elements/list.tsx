interface IListType {
  children: React.ReactNode;
  onClick: () => void;
}

export default function List({ onClick, children }: IListType) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
}
