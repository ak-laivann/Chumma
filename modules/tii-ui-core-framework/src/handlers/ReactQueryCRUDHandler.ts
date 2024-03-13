import {
  QueryKey,
  useQuery as useReactQuery,
  useMutation as useRQMutation,
  UseMutationResult,
  UseQueryResult,
  QueryFunction,
  MutationFunction,
} from "@tanstack/react-query";
import axios, { AxiosInstance } from "axios";
import { getAxiosInstance } from "../config";
import { CRUDDao } from "../dao";
import {
  ApiHook,
  AsyncResponse,
  Entity,
  ErrorProps,
  GetApiHook,
  LoaderProps,
  PostApiHook,
  PostResponse,
  PutApiHook,
  PutResponse,
  UpdateResponse,
} from "../models";

function generateCRUDHook<T extends Entity>(
  dao: CRUDDao<T>,
  method: "GET" | "POST" | "PUT" | "PATCH"
): ApiHook<T> {
  type GetRQApiHookType = (
    cacheKey: QueryKey,
    fn: QueryFunction<T>,
    config: any
  ) => UseQueryResult;
  type PutRQApiHookType = (
    fn: MutationFunction<UpdateResponse, T>,
    config: any
  ) => UseMutationResult;
  type ApiResultType =
    | UseQueryResult<T>
    | UseMutationResult<PostResponse, any, Omit<T, "id">>
    | UseMutationResult<PutResponse, any, T>
    | UseMutationResult<PutResponse, any, Partial<T> & Pick<T, "buId" | "id">>;

  let useRQHook: GetRQApiHookType | PutRQApiHookType;
  let hookParams: ((...payload: any[]) => any)[] = [];

  function genCacheKey(...payload: any[]) {
    return [...dao.getCacheKeyPrefix(), ...payload];
  }

  function genAsyncFunction(...payload: any[]) {
    switch (method) {
      case "GET":
        return () => dao.get(payload[0], payload[1], payload[2]);
      case "PUT":
        return dao.put;
      case "POST":
        return dao.post;
    }
  }

  const hook = (...payload: any[]) => {
    const isGet = (result: ApiResultType): result is UseQueryResult<T> =>
      method == "GET";
    const isPut = (
      result: ApiResultType
    ): result is UseMutationResult<PutResponse, any, T> => method == "PUT";
    const isPost = (
      result: ApiResultType
    ): result is UseMutationResult<PostResponse, any, Omit<T, "id">> =>
      method == "POST";
    const isPatch = (
      result: ApiResultType
    ): result is UseMutationResult<
      PutResponse,
      any,
      Partial<T> & Pick<T, "buId" | "id">
    > => method == "PATCH";

    const result: ApiResultType = (useRQHook as any)(
      ...hookParams.map((fn) => fn(...payload))
    );

    let response: AsyncResponse<T | UpdateResponse>;
    if (result.data) {
      response = result.data;
    } else if (result.status == "loading") {
      response = new LoaderProps(Infinity);
    } else if (result.status == "error") {
      response = new ErrorProps(result.error);
    } else if (result.status == "idle") {
      response = new LoaderProps("idle");
    } else {
      response = new ErrorProps(new Error("unknown status"));
    }

    if (isGet(result)) {
      return {
        triggerRequest: () => {
          result.refetch();
        },
        reset: result.remove,
        response: response as AsyncResponse<T>,
        type: "GET",
      };
    } else if (isPut(result)) {
      return {
        triggerRequest: (variable: T) => result.mutate(variable),
        reset: result.reset,
        response: response as AsyncResponse<PutResponse>,
        type: "PUT",
      };
    } else if (isPost(result)) {
      return {
        triggerRequest: (variable: Omit<T, "id">) => result.mutate(variable),
        reset: result.reset,
        response: response as AsyncResponse<PostResponse>,
        type: "POST",
      };
    } else if (isPatch(result)) {
      return {
        triggerRequest: (variable: Partial<T> & Pick<T, "buId" | "id">) =>
          result.mutate(variable),
        reset: result.reset,
        response: response as AsyncResponse<PutResponse>,
        type: "PATCH",
      };
    } else {
      throw new Error("unknown result type: " + JSON.stringify(result));
    }
  };

  switch (method) {
    case "GET":
      useRQHook = useReactQuery;
      hookParams = [genCacheKey, genAsyncFunction, dao.getConfig];
      return hook as GetApiHook<T>;
    case "POST":
      useRQHook = useRQMutation;
      hookParams = [genAsyncFunction, dao.getConfig];
      return hook as PostApiHook<T>;
    case "PUT":
      useRQHook = useRQMutation;
      hookParams = [genAsyncFunction, dao.getConfig];
      return hook as PutApiHook<T>;
    default:
      throw new Error("unknown method type " + method);
  }
}

export function generateCRUDHooks<T extends Entity>(
  entityPluralName: string,
  defaultInstance: AxiosInstance = axios.create(),
  useMirage: boolean = false,
  version: string = "v1"
) {
  let dao = new CRUDDao<T>(entityPluralName, version);
  dao.setAxiosInstance(getAxiosInstance());
  dao.setUseMirage(useMirage);
  return {
    useGetHook: generateCRUDHook<T>(dao, "GET") as GetApiHook<T>,
    usePostHook: generateCRUDHook<T>(dao, "POST") as PostApiHook<Omit<T, "id">>,
    usePutHook: generateCRUDHook<T>(dao, "PUT") as PutApiHook<T>,
  };
}
