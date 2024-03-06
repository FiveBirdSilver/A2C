import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface IButtonType {
  id: number;
  name: string;
  image: string;
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
