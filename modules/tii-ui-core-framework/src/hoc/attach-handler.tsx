import * as React from "react";
import { RouteProps } from "react-router";

export interface HandlerOptions {
  onScreenChange?: (screenName: string) => void;
  Wrapper?: React.ComponentType<React.PropsWithChildren>;
}

export function attachAsyncDataWithLayout<T extends any, AdditionalProps = {}>(
  screenName: string,
  options?: HandlerOptions
) {
  const Wrapper =
    options?.Wrapper ??
    ((props: React.PropsWithChildren) => <>{props.children}</>);

  return function (handler: (props: AdditionalProps) => T) {
    return function (Layout: React.FunctionComponent<T>) {
      return function (props: AdditionalProps) {
        React.useEffect(() => {
          options?.onScreenChange?.(screenName);
        }, []);
        return (
          <Wrapper>
            {
              // @ts-ignore
              <Layout {...handler(props)} />
            }
          </Wrapper>
        );
      };
    };
  };
}
