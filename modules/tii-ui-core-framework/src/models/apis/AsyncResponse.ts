import { LoaderProps } from "./Loader";
import { ErrorProps } from "./Error";

export type AsyncResponse<T> = T | LoaderProps | ErrorProps;
export function isResponseLoading(
  data?: AsyncResponse<any>
): data is LoaderProps {
  return (
    !!data &&
    data.hasOwnProperty("percentLoaded") &&
    data.percentLoaded !== "idle"
  );
}
export function isResponseError(data?: AsyncResponse<any>): data is ErrorProps {
  return !!data && data.hasOwnProperty("error");
}
export function isResponseIdle(data?: AsyncResponse<any>): data is LoaderProps {
  return (
    !!data &&
    data.hasOwnProperty("percentLoaded") &&
    data.percentLoaded === "idle"
  );
}
export function isResponseResolved<T>(data?: AsyncResponse<T>): data is T {
  return (
    !(
      isResponseLoading(data) ||
      isResponseError(data) ||
      isResponseIdle(data)
    ) && !!data
  );
}

export function isResponseEqual<T>(
  a: AsyncResponse<T>,
  b: AsyncResponse<T>
): boolean {
  if (
    (isResponseLoading(a) || isResponseIdle(a)) &&
    (isResponseLoading(b) || isResponseIdle(b))
  ) {
    return a.equals(b);
  } else if (isResponseError(a) && isResponseError(b)) {
    return a.equals(b);
  } else if (isResponseResolved(a) && isResponseResolved(b)) {
    return JSON.stringify(a) === JSON.stringify(b);
  } else {
    return false; // different types.
  }
}
