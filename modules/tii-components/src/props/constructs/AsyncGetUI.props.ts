import {
  Entity,
  PostResponse,
  PutResponse,
  UseListingResponseType,
} from "@tii/ui-core-framework";
import { AsyncPutUI } from "./AsyncPutUI.props";
import { AsyncUIProps, AsyncUIWrapperProps } from "./AsyncUI.props";

export interface AsyncGetUIProps<T> extends AsyncUIProps<T> {
  triggerRequest: () => void;
  onFailure?: (error: Error) => void;
}

export interface AsyncGetUI<T> {
  Wrapper: (props: AsyncUIWrapperProps) => JSX.Element;
  getResponse: () => T | null;
  triggerRequest: () => Promise<T>;
  reset?: () => void;
}

export interface AsyncGetAndPostUI<T extends Entity> {
  Wrapper: (props: AsyncUIWrapperProps) => JSX.Element;
  getResponse: () => T | null;
  triggerRequest: (req: Omit<T, "id">) => Promise<PostResponse>;
  reset: () => void;
  asyncUI1: AsyncGetUI<T>;
  asyncUI2: AsyncPutUI<T>;
}

export interface AsyncGetAndPutUI<T extends Entity> {
  Wrapper: (props: AsyncUIWrapperProps) => JSX.Element;
  getResponse: () => T | null;
  triggerRequest: (
    req: Omit<T, "id"> & Partial<Pick<T, "id">>
  ) => Promise<PutResponse>;
  reset: () => void;
  asyncUI1: AsyncGetUI<T>;
  asyncUI2: AsyncPutUI<T>;
}

export interface AsyncListAndPutUI<K, T extends Entity> {
  Wrapper: (props: AsyncUIWrapperProps) => JSX.Element;
  getResponse: () => UseListingResponseType<K> | null;
  triggerRequest: (
    req: Omit<T, "id"> & Partial<Pick<T, "id">>
  ) => Promise<PutResponse>;
  reset: () => void;
  asyncUI1: AsyncGetUI<UseListingResponseType<K>>;
  asyncUI2: AsyncPutUI<T>;
}
