import { Entity, PostResponse, PutResponse } from "@tii/ui-core-framework";
import { AsyncUIProps, AsyncUIWrapperProps } from "./AsyncUI.props";

export interface AsyncPutUIProps<
  Request,
  Response extends PutResponse | PostResponse = PutResponse | PostResponse
> extends AsyncUIProps<Response> {
  triggerRequest: (payload: Request) => void;
  /**
   * @deprecated this function will not be triggered in future. instead use .then
   */
  onSuccess?: (response: Response) => void;
  /**
   * @deprecated this function will not be triggered in future. instead use .catch
   */
  onFailure?: (error: Error) => void;
}

export interface AsyncPutUI<
  Request,
  Response extends PutResponse | PostResponse = PutResponse | PostResponse
> {
  Wrapper: (props: AsyncUIWrapperProps) => JSX.Element;
  getResponse: () => Response | null;
  triggerRequest: (req: Request) => Promise<Response>;
  reset?: () => void;
}

export interface AsyncPostAndPutUI<T extends Entity> {
  Wrapper: (props: AsyncUIWrapperProps) => JSX.Element;
  getResponse: () => PostResponse | null;
  triggerRequest: (
    req: Omit<T, "id"> & Partial<Pick<T, "id">>
  ) => Promise<PutResponse | PostResponse>;
  reset: () => void;
  asyncUI1: AsyncPutUI<T>;
  asyncUI2: AsyncPutUI<T>;
}
