import { FC, SVGAttributes } from "react";

export interface ButtonProps<T = unknown> {
  text: string;
  icon: Icon;
  onSubmitClick: (input: T) => void;
  ref?: TIIButtonInstance;
}

export interface TIIButtonInstance {
  setLoading: (loading: boolean) => void;
}

export type Icon = FC<SVGAttributes<SVGElement>>;
