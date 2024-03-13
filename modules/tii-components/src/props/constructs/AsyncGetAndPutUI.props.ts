import {
  Entity,
  GetApiHook,
  PostApiHook,
  PostResponse,
  PutApiHook,
  PutResponse,
} from "@tii/ui-core-framework";
import { AsyncUIProps } from "./AsyncUI.props";

/**
 * @deprecated "please stop using this."
 */
export interface AsyncGetAndPutUIProps<
  T extends Entity,
  S extends PostResponse | PutResponse = PostResponse | PutResponse
> {
  getApiHook: ReturnType<GetApiHook<T>>;
  putApiHook: ReturnType<PutApiHook<T> | PostApiHook<T>>;
  /**
   * @deprecated this function will not be triggered in future. instead use .then
   */
  onSuccess?: (response: S) => void;
  /**
   * @deprecated this function will not be triggered in future. instead use .catch
   */
  onFailure?: (error: Error) => void;
}
