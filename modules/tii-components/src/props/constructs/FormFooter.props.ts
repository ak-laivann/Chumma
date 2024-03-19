import React from "react";
import { ButtonProps } from "./TIIButtonAndLink.props";

export interface FormFooterProps {
  submit?: ButtonProps & { disabled?: boolean };
  draft?: ButtonProps & { disabled?: boolean };
  secondaryLink?: Partial<ButtonProps> & { disabled?: boolean };
  submitDisabled?: boolean;
  leftView?: React.ReactNode;
  footerDisabled: boolean;
}
