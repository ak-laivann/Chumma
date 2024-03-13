import { AsyncUIProps, AsyncUIWrapperProps } from "../../../props";
import {
  AsyncResponse,
  isResponseError,
  isResponseLoading,
  isResponseResolved,
  isResponseEqual,
  APIContext,
} from "@tii/ui-core-framework";
import { TIILoader } from "../TIILoader";
import { TIIError } from "../TIIError";
import { useEffect, useState } from "react";

export abstract class AsyncUIClass<Response, Request = unknown> {
  protected response;
  public reset;

  private shouldHandleResponseStatusInWrapper: boolean;
  private shouldHandleLoading: boolean;
  private isComponentLoaded: boolean = false;
  protected onSuccess?: (response: Response) => void;
  protected onFailure?: (error: Error) => void;
  constructor({
    response,
    reset,
    shouldHandleResponseStatusInWrapper,
    shouldHandleLoading,
  }: AsyncUIProps<Response>) {
    this.response = response;
    this.reset = reset;
    this.shouldHandleResponseStatusInWrapper =
      shouldHandleResponseStatusInWrapper ?? true;
    this.shouldHandleLoading = shouldHandleLoading ?? true;
  }

  protected onResponseUpdated = (_: AsyncResponse<Response>) => {};

  private updateResponse: (response: AsyncResponse<Response>) => void = (
    response
  ) => {
    this.response = response;
    if (isResponseResolved(response)) {
      this.onSuccess?.(response);
    } else if (isResponseError(response)) {
      this.onFailure?.(response.error);
    }
    this.onResponseUpdated(response);
  };

  abstract triggerRequest:
    | ((payload: Request) => Promise<Response>)
    | ((action: string, payload: Request) => Promise<Response>)
    | (() => Promise<Response>);
  protected MethodWrapper: React.FC<AsyncUIWrapperProps> = (props) => (
    <>{props.children}</>
  );

  Wrapper: (props: AsyncUIWrapperProps) => JSX.Element = (props) => {
    let MethodWrapper = this.MethodWrapper;
    if (
      !this.shouldHandleResponseStatusInWrapper ||
      isResponseResolved(this.response) ||
      (isResponseLoading(this.response) &&
        !this.shouldHandleLoading &&
        this.isComponentLoaded)
    ) {
      this.isComponentLoaded = true;
      return (
        <APIContext.Provider value={this.response}>
          <MethodWrapper {...props}> {props.children} </MethodWrapper>
        </APIContext.Provider>
      );
    } else if (isResponseLoading(this.response)) {
      return (
        <>
          {props.inlineProps?.customLoader ?? (
            <TIILoader mode={props.skeletonLoader ? "SKELETON" : "SPINNER"} />
          )}
        </>
      );
    } else {
      return (
        <MethodWrapper {...props}>
          <TIIError
            title={this.response.error.name}
            message={this.response.error.message}
          />
        </MethodWrapper>
      );
    }
  };

  getResponse: () => Response | null = () => {
    return isResponseResolved(this.response) ? this.response : null; // throw new Error("Response not resolved yet. Can't access this property yet.")
  };

  static useAsyncUI: <
    T,
    AsyncChildUIProps extends AsyncUIProps<T>,
    AsyncChildUI extends AsyncUIClass<T>
  >(
    asyncUIFn: () => AsyncChildUI,
    params: AsyncChildUIProps
  ) => AsyncChildUI = (asyncUIFn, params) => {
    const [asyncUI, _] = useState(asyncUIFn);
    const [response, setResponse] = useState(params.response);
    useEffect(() => {
      if (!isResponseEqual(response, params.response)) {
        asyncUI.updateResponse(params.response);
        setResponse(params.response);
      }
    });

    return asyncUI;
  };
}
