import { AsyncResponse } from "@tii/ui-core-framework";
import { ModalProps } from "antd";
import React, { PropsWithChildren } from "react";
import { TIIButtonInstance } from "./TIIButtonAndLink.props";

export interface AsyncUIProps<T> {
  response: AsyncResponse<T>;
  reset?: () => void;
  shouldHandleResponseStatusInWrapper?: boolean;
  shouldHandleLoading?: boolean;
}

export interface AsyncUIWrapperProps extends PropsWithChildren {
  confirmModalContent?: React.ReactNode;
  skeletonLoader?: boolean;
  modalProps?: ModalProps;
  inlineProps?: {
    customLoader?: React.ReactNode;
    buttonRefs?: React.RefObject<TIIButtonInstance>[];
  };
}
