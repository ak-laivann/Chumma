import {
  useQuery as useReactQuery,
  useMutation as useRQMutation,
  useQueryClient,
  QueryObserverOptions,
  UseMutationOptions,
  UseMutateFunction,
  UseMutationResult,
} from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  AsyncRequest,
  AsyncResponse,
  ErrorProps,
  isResponseEqual,
  isResponseResolved,
  LoaderProps,
} from "../models";
import { ClassType } from "../models/apis/AsyncRequest";

/**
 *
 * use this query when you need custom dao (other than crud and listing)
 *
 * @param dao
 * @param overrides
 * @returns
 */
export function useQueryWithMetaData<
  Output,
  DAO extends AsyncRequest<Output> = any
>(dao: DAO, overrides = {} as QueryObserverOptions<Output, Error>) {
  const queryClient = useQueryClient();
  dao.queryClient = queryClient;

  if (dao.getAsyncFunction.length > 0) {
    throw new ErrorProps(
      new Error("useQuery async function shouldn't accept any parameters."),
      dao.getAsyncFunction
    );
  }

  const result = useReactQuery<Output, Error>(
    dao.getCacheKey(),
    dao.getAsyncFunction as () => Promise<Output>, // we have a check above to make sure no arguments are passed.
    {
      ...(dao.getConfig() as QueryObserverOptions<Output, Error>),
      ...overrides,
    }
  );

  if (result.isLoading) {
    return { queryResult: result, response: new LoaderProps(Infinity) };
  } else if (result.isError) {
    return { queryResult: result, response: new ErrorProps(result.error) };
  } else if (result.data) {
    return { queryResult: result, response: result.data };
  } else {
    return {
      queryResult: result,
      response: new ErrorProps(
        new Error("unknown result state: " + result.status),
        result.error
      ),
    };
  }
}

export interface MutationResult<Input, Output> {
  triggerRequest: UseMutateFunction<Output, Error, Input, unknown>;
  response: AsyncResponse<Output>;
  resetRequest: () => void;
  mutationResult: UseMutationResult<Output, Error, Input, unknown>;
}

export type UseListingResponseType<Output> = Output & {
  currentPage: number;
  currentSize: number;
  onRequestData: (page: number, size: number) => void;
};
export interface UseListingResult<Output> {
  triggerRequest: () => void;
  reset: () => void;
  response: AsyncResponse<UseListingResponseType<Output>>;
  shouldHandleLoading: boolean;
}

export function useMutationWithMetaData<
  Input,
  Output,
  DAO extends AsyncRequest<Output, Input> = any
>(dao: DAO): MutationResult<Input, Output> {
  const queryClient = useQueryClient();
  dao.queryClient = queryClient;

  const mutation: UseMutationResult<Output, Error, Input> = useRQMutation(
    dao.getAsyncFunction as (variables: Input) => Promise<Output>,
    dao.getConfig() as Omit<
      UseMutationOptions<Output, Error, Input>,
      "mutationFn"
    >
  );
  const { mutate, data, reset } = mutation;
  if (mutation.isIdle) {
    return {
      triggerRequest: mutate,
      resetRequest: reset,
      response: new LoaderProps("idle"),
      mutationResult: mutation,
    };
  } else if (mutation.isLoading) {
    return {
      triggerRequest: mutate,
      resetRequest: reset,
      response: new LoaderProps(Infinity),
      mutationResult: mutation,
    };
  } else if (mutation.isError) {
    return {
      triggerRequest: mutate,
      resetRequest: reset,
      response: new ErrorProps(mutation.error),
      mutationResult: mutation,
    };
  } else if (data) {
    return {
      triggerRequest: mutate,
      resetRequest: reset,
      response: data,
      mutationResult: mutation,
    };
  } else {
    return {
      triggerRequest: mutate,
      resetRequest: reset,
      response: new ErrorProps(new Error("unknown state")),
      mutationResult: mutation,
    };
  }
}

export function useMutation<
  Input,
  Output,
  DAO extends AsyncRequest<Output, Input> = any
>(dao: DAO): Omit<MutationResult<Input, Output>, "mutationResult"> {
  let result: Omit<
    MutationResult<Input, Output>,
    "mutationResult"
  > = useMutationWithMetaData<Input, Output, DAO>(dao);
  delete (result as Partial<MutationResult<Input, Output>>).mutationResult;
  return result;
}

function convertAsyncResponseIntoListingResult<T>(
  response: AsyncResponse<T>,
  pageState: [number, Dispatch<SetStateAction<number>>],
  sizeState: [number, Dispatch<SetStateAction<number>>],
  triggerRequest: () => void,
  reset: () => void
): UseListingResult<T> {
  const finalResponse = isResponseResolved(response)
    ? {
        ...response,
        currentPage: pageState[0],
        currentSize: sizeState[0],
        onRequestData: (page: number, size: number) => {
          pageState[1](page);
          sizeState[1](size);
        },
      }
    : response;

  return {
    triggerRequest,
    reset,
    response: finalResponse,
    shouldHandleLoading: false,
  };
}

export function useListingQuery<Output, DAO extends AsyncRequest<Output>>(
  tClass: ClassType<DAO>, // typeof AsyncRequest<Output>,
  pageNumber: number,
  pageSize: number,
  ...payload: any[]
): UseListingResult<Output> {
  const [page, setPage] = useState<number>(pageNumber);
  const [size, setSize] = useState<number>(pageSize);
  const [previousPayload, setPrevPayload] = useState<any[]>(payload);
  const searchPayloadSynced = // making sure all the queries are in sync
    JSON.stringify(payload) === JSON.stringify(previousPayload);

  useEffect(() => {
    if (!searchPayloadSynced) {
      setPage(pageNumber);
      setSize(pageSize);
      setPrevPayload(payload);
    }
  });
  useEffect(() => {
    setPage(pageNumber);
    setSize(pageSize);
  }, [pageNumber, pageSize]);
  const dao = new tClass(page, size, ...payload);

  const {
    response,
    queryResult: { refetch, remove },
  } = useQueryWithMetaData<Output, DAO>(dao, {
    enabled:
      searchPayloadSynced && (dao.getConfig() as QueryObserverOptions).enabled,
  });

  return convertAsyncResponseIntoListingResult(
    response,
    [page, setPage],
    [size, setSize],
    refetch,
    remove
  );
}

export type MultiListingDaoOutput<T> = { [key: string]: T };
export interface UseMultiListingResult<Output> {
  [key: string]: UseListingResult<Output>;
}
export function useMultiListingQuery<
  Output,
  DAO extends AsyncRequest<MultiListingDaoOutput<Output>>
>(
  tClass: ClassType<DAO>,
  pageNumber: number,
  pageSize: number,
  queryParams: (any & { queryId: string })[],
  responseInterceptor: (
    response: MultiListingDaoOutput<AsyncResponse<Output>>
  ) => MultiListingDaoOutput<AsyncResponse<Output>> = (r) => r,
  requestInterceptor: (
    daoRequestParams: [number, number, (any & { queryId: string })[]]
  ) => any[] = (r) => r
): UseMultiListingResult<Output> {
  const [page, setPage] = useState<number>(pageNumber);
  const [size, setSize] = useState<number>(pageSize);
  const [searchIndices, setSearchIndices] = useState<number[]>(() =>
    queryParams.map((_, i) => i)
  );
  const previousQueries = useRef<any[]>(queryParams);
  const searchIndicesSynced = // making sure all the queries are in sync
    JSON.stringify(queryParams) === JSON.stringify(previousQueries.current);

  useEffect(() => {
    if (!searchIndicesSynced) {
      const affectedIndicies = queryParams
        .map<number | false>((it, idx) =>
          JSON.stringify(it) !== JSON.stringify(previousQueries.current?.[idx])
            ? idx
            : false
        )
        .filter((it) => it !== false) as number[];
      setSearchIndices(affectedIndicies);
      setPage(pageNumber);
      setSize(pageSize);
      previousQueries.current = queryParams;
    }
  });

  useEffect(() => {
    setPage(pageNumber);
    setSize(pageSize);
  }, [pageNumber, pageSize]);

  const [completeResult, setCompleteResult] = useState<
    UseMultiListingResult<Output>
  >({});
  const filteredQueryParams = queryParams.filter(
    (_, i) => searchIndices.includes(i) && searchIndicesSynced
  );

  let dao = new tClass(
    ...requestInterceptor([page, size, filteredQueryParams])
  );

  const {
    response,
    queryResult: { refetch, remove },
  } = useQueryWithMetaData<MultiListingDaoOutput<Output>, DAO>(dao, {
    enabled:
      searchIndicesSynced && (dao.getConfig() as QueryObserverOptions).enabled,
  });

  let interceptedResponse: MultiListingDaoOutput<AsyncResponse<Output>>;
  if (isResponseResolved(response)) {
    interceptedResponse = responseInterceptor(
      // because cached responses might give extra data
      Object.fromEntries(
        Object.entries(response).filter(([id]) =>
          filteredQueryParams.find(({ queryId }) => queryId == id)
        )
      )
    );
  } else {
    interceptedResponse = responseInterceptor(
      filteredQueryParams.reduce<
        MultiListingDaoOutput<LoaderProps | ErrorProps>
      >(
        (acc, { queryId }) => ({
          ...acc,
          [queryId]: response,
        }),
        {}
      )
    );
  }

  let result = Object.entries(interceptedResponse).reduce(
    (acc, [queryId, response]) => {
      let index = queryParams.findIndex(({ queryId: id }) => id === queryId);
      let listingResult = convertAsyncResponseIntoListingResult(
        response,
        [page, setPage],
        [size, setSize],
        refetch,
        remove
      );
      let _listingResponse = listingResult.response;
      let listingResponse: AsyncResponse<UseListingResponseType<Output>> =
        isResponseResolved(_listingResponse)
          ? {
              ..._listingResponse,
              onRequestData: (page, size) => {
                setSearchIndices([index]);
                (
                  _listingResponse as UseListingResponseType<Output>
                ).onRequestData(page, size);
              },
            }
          : _listingResponse;
      return {
        ...acc,
        [queryId]: {
          ...listingResult,
          response: listingResponse,
          triggerRequest: () => {
            if (isResponseResolved(listingResponse)) {
              setSearchIndices([index]);
              setPage(listingResponse.currentPage);
              setSize(listingResponse.currentSize);
            } else {
              listingResult.triggerRequest();
            }
          },
        },
      };
    },
    completeResult
  );
  Object.entries(result).some(
    ([queryId, r]) =>
      !isResponseEqual(r.response, completeResult[queryId]?.response)
  ) && setCompleteResult(result);
  return result;
}
