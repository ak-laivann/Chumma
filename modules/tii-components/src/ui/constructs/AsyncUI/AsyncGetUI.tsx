import { AsyncGetUIProps, AsyncUIWrapperProps } from "../../../props";
import { useState } from "react";
import { AsyncUIClass } from "./AsyncUI";
import { isResponseError } from "@tii/ui-core-framework";

export class AsyncGetUIClass<T> extends AsyncUIClass<T> {
  private _triggerRequest;
  private _onFailure;
  constructor(props: AsyncGetUIProps<T>) {
    super(props);
    this._onFailure = props.onFailure;
    this._triggerRequest = props.triggerRequest;
  }

  triggerRequest: () => Promise<T> = () => {
    return new Promise((resolve, reject) => {
      this.reset?.();
      this._triggerRequest();
      this.onSuccess = resolve;
      this.onFailure = reject;
    });
  };

  protected MethodWrapper: React.FC<AsyncUIWrapperProps> = (
    props: AsyncUIWrapperProps
  ) => {
    if (this._onFailure && isResponseError(this.response)) {
      this._onFailure(this.response.error);
    }
    return <>{props.children}</>;
  };
}

export function useAsyncGetUI<T>(
  params: AsyncGetUIProps<T>
): AsyncGetUIClass<T> {
  return AsyncUIClass.useAsyncUI<T, AsyncGetUIProps<T>, AsyncGetUIClass<T>>(
    () => new AsyncGetUIClass<T>(params),
    params
  );
}

export function useCloneAsyncGetUI<OldType, NewType = OldType>(
  asyncUI: AsyncGetUIClass<OldType>,
  transformer: (res: OldType) => NewType = (r) => r as unknown as NewType
): AsyncGetUIClass<NewType> {
  const [clonedAsyncUI, _] = useState<AsyncGetUIClass<NewType>>(
    () => ({ ...asyncUI } as unknown as AsyncGetUIClass<NewType>)
  );

  const getResponse: () => NewType | null = () => {
    let resp = asyncUI.getResponse();
    return resp ? transformer(resp) : null;
  };
  clonedAsyncUI.getResponse = getResponse;
  return clonedAsyncUI;
}
