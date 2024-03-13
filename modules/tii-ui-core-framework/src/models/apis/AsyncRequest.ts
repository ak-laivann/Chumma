import {
  QueryClient,
  QueryObserverOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

export abstract class AsyncRequest<Output, Input = unknown> {
  protected _queryClient!: QueryClient;
  public get queryClient(): QueryClient {
    return this._queryClient;
  }
  public set queryClient(value: QueryClient) {
    this._queryClient = value;
  }

  abstract getAsyncFunction:
    | ((input: Input) => Promise<Output>)
    | (() => Promise<Output>);
  abstract getCacheKey: () => Array<string | object>;
  abstract getConfig: () =>
    | Omit<UseMutationOptions<Output, Error, Input>, "mutationFn">
    | QueryObserverOptions<Output, Error>;
}

export interface ClassType<T> extends Function {
  new (...args: any[]): T;
}
