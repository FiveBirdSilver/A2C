import { Dispatch, SetStateAction } from "react";

export interface IListType {
  children: React.ReactNode;
  onClick: () => void;
}

export interface IinputType {
  label: string;
  id: string;
  testId?: string;
  type: string;
  value: string;
  setState: Dispatch<SetStateAction<string>>;
  placeholder: string;
}
