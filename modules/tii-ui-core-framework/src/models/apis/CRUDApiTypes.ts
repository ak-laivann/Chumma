import { AsyncResponse } from "./AsyncResponse";
import { Entity } from "./CRUDEntity";

export type PostResponse = { id: string };
export type PutResponse = { status: string };
export type UpdateResponse = PostResponse | PutResponse;

export type GetApiHook<T extends Entity> = (...payload: any[]) => {
  triggerRequest: () => void;
  reset: () => void;
  response: AsyncResponse<T>;
  type: "GET";
};
export type PutApiHook<T extends Entity> = () => {
  triggerRequest: (payload: T) => void;
  reset: () => void;
  response: AsyncResponse<PutResponse>;
  type: "PUT";
};
export type PostApiHook<T extends Omit<Entity, "id">> = () => {
  triggerRequest: (payload: Omit<T, "id">) => void;
  reset: () => void;
  response: AsyncResponse<PostResponse>;
  type: "POST";
};

export type ApiHook<T extends Entity> =
  | GetApiHook<T>
  | PostApiHook<T>
  | PutApiHook<T>;

export function isGetApiHook<T extends Entity>(
  hook: ReturnType<ApiHook<T>>
): hook is ReturnType<GetApiHook<T>> {
  return hook.type == "GET";
}
export function isPutApiHook<T extends Entity>(
  hook: ReturnType<ApiHook<T>>
): hook is ReturnType<PutApiHook<T>> {
  return hook.type == "PUT";
}
export function isPostApiHook<T extends Entity>(
  hook: ReturnType<ApiHook<T>>
): hook is ReturnType<PostApiHook<T>> {
  return hook.type == "POST";
}
