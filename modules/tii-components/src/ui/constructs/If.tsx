import { IfProps } from "../../props";

export const If = ({ condition, children }: IfProps) => {
  if (!condition) return null;
  return <>{children}</>;
};
