import { AsyncPutUIProps, AsyncUIWrapperProps } from "../../../props";
import {
  AsyncResponse,
  ErrorProps,
  isResponseError,
  isResponseLoading,
  isResponseResolved,
  PostResponse,
  PutResponse,
} from "@tii/ui-core-framework";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { AsyncUIClass } from "./AsyncUI";

export class AsyncPutUIClass<
  Request,
  Response extends PutResponse | PostResponse = PutResponse | PostResponse
> extends AsyncUIClass<Response, Request> {
  private _triggerRequest;
  /**
   * @deprecated instead use the promise
   */
  private _onSubmissionSuccess;
  /**
   * @deprecated instead use the promise
   */
  private _onSubmissionFailure;
  private modalControls?: {
    setOpen: (_: boolean) => void;
    setPayload: (_: Request | null) => void;
    onError: (error: ErrorProps) => void;
  };

  constructor(props: AsyncPutUIProps<Request, Response>) {
    super({ shouldHandleResponseStatusInWrapper: false, ...props });
    this._triggerRequest = props.triggerRequest;
    this._onSubmissionSuccess = props.onSuccess;
    this._onSubmissionFailure = props.onFailure;
  }

  onResponseUpdated: (response: AsyncResponse<Response>) => void = (
    response
  ) => {
    if (isResponseResolved(response)) {
      this._onSubmissionSuccess?.(response);
      this.modalControls?.setOpen(false);
      this.modalControls?.setPayload(null);
    } else if (isResponseError(response)) {
      this._onSubmissionFailure?.(response.error);
      this.modalControls?.setOpen(false);
      this.modalControls?.setPayload(null);
      this.modalControls?.onError(response);
    }
  };

  triggerRequest: (payload: Request) => Promise<Response> = (payload) => {
    return new Promise((resolve, reject) => {
      this.reset?.();
      this.modalControls?.setPayload(payload);
      this.modalControls?.setOpen(true);
      this.onSuccess = resolve;
      this.onFailure = reject;
    });
  };

  protected MethodWrapper: React.FC<AsyncUIWrapperProps> = (
    props: AsyncUIWrapperProps
  ) => {
    const [open, setOpen] = useState(false);
    const [payload, setPayload] = useState<Request | null>(null);

    const containsBtnRefs = () => {
      return props.inlineProps?.buttonRefs?.length ?? 0 > 0;
    };

    const onError = (response: ErrorProps) => {
      if (!containsBtnRefs()) {
        Modal.error({
          title: "Error: " + response.error.name,
          content: response.error.message,
        });
      }
    };

    const handleOk = () => {
      if (payload == null) {
        throw new Error(
          "Payload is null. forgot to set the payload before OK-ing?"
        );
      }
      this._triggerRequest(payload);
    };

    useEffect(() => {
      if (containsBtnRefs()) {
        props.inlineProps?.buttonRefs?.forEach((it) =>
          it.current?.setLoading(open)
        );
        if (open) {
          handleOk();
        }
      }
    }, [open, payload]);

    useEffect(() => {
      this.modalControls = { setOpen, setPayload, onError };

      return () => (this.modalControls = undefined);
    }, []);

    return (
      <>
        {props.children}
        {!containsBtnRefs() && (
          <Modal
            {...props.modalProps}
            title={props.modalProps?.title ?? "Are you sure?"}
            data-testid="put-ui-modal"
            open={open && !isResponseResolved(this.response)}
            visible={open && !isResponseResolved(this.response)}
            onOk={handleOk}
            okButtonProps={{
              id: "put-ui-modal-ok",
            }}
            onCancel={() => {
              setOpen(false);
              this.onSuccess = undefined;
              this.onFailure?.(new Error("cancelled"));
            }}
            cancelButtonProps={{
              disabled: isResponseLoading(this.response),
              id: "put-ui-modal-cancel",
            }}
            confirmLoading={isResponseLoading(this.response)}
            closable={!isResponseLoading(this.response)}
            maskClosable={!isResponseLoading(this.response)}
            keyboard={!isResponseLoading(this.response)}
          >
            {props.confirmModalContent ?? "Please press OK to send"}
          </Modal>
        )}
      </>
    );
  };
}

export function useAsyncPutUI<
  Response extends PutResponse | PostResponse,
  Request = any
>(
  params: AsyncPutUIProps<Request, Response>
): AsyncPutUIClass<Request, Response> {
  type InferredRequestType = Parameters<typeof params.triggerRequest>[0];
  return AsyncUIClass.useAsyncUI<
    Response,
    AsyncPutUIProps<Request, Response>,
    AsyncPutUIClass<any, Response>
  >(() => new AsyncPutUIClass<InferredRequestType, Response>(params), params);
}
