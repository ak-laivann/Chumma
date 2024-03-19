import React, { FC, LegacyRef, SVGAttributes } from "react";

export interface ButtonProps<T = unknown> {
  text: string;
  icon: React.ReactNode | React.ReactElement;
  onSubmitClick: (input: T) => void;
  ref?: LegacyRef<TIIButtonInstance>;
}

export interface TIIButtonInstance {
  setLoading: (loading: boolean) => void;
}
