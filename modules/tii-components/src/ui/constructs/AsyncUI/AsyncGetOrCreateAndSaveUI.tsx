import {
  PutApiHook,
  Entity,
  PutResponse,
  PostApiHook,
  PostResponse,
  UseListingResponseType,
} from "@tii/ui-core-framework";
import {
  AsyncGetAndPostUI as _AsyncGetAndPostUI,
  AsyncGetAndPutUI as _AsyncGetAndPutUI,
  AsyncPostAndPutUI as _AsyncPostAndPutUI,
  AsyncListAndPutUI as _AsyncListAndPutUI,
  AsyncUIWrapperProps,
  AsyncPutUIProps,
  AsyncGetUIProps,
} from "../../../props";
import { AsyncPutUIClass, useAsyncPutUI } from "./AsyncPutUI";
import { AsyncGetUIClass, useAsyncGetUI } from "./AsyncGetUI";
import { useState } from "react";
import { Modal } from "antd";

function useAsyncCreateAndSaveUI<Request extends Entity>(
  createHook: ReturnType<PostApiHook<Request>>,
  saveHook: ReturnType<PutApiHook<Request>>
) {
  const PostUI = useAsyncPutUI<PostResponse, Omit<Request, "id">>(createHook);
  const PutUI = useAsyncPutUI<PutResponse, Request>(saveHook);
  const [id, setId] = useState<string | null>(null);

  const [Wrapper, _] = useState(() => (props: AsyncUIWrapperProps) => {
    const propsWithoutChildren = Object.assign({}, props);
    delete propsWithoutChildren["children"];

    const PostWrapper = PostUI.Wrapper;
    const PutWrapper = PutUI.Wrapper;

    return (
      <PutWrapper {...propsWithoutChildren}>
        <PostWrapper {...props} />
      </PutWrapper>
    );
  });

  return {
    Wrapper,
    getResponse: PostUI.getResponse,
    asyncUI1: PostUI,
    asyncUI2: PutUI,
    triggerRequest: async (
      req: Omit<Request, "id"> & Partial<Pick<Request, "id">>
    ) => {
      if (id == null) {
        let response = await PostUI.triggerRequest(req);
        setId(response.id);
        return response;
      } else {
        const putRequest = {
          id: id,
          ...req,
        } as Request;
        return await PutUI.triggerRequest(putRequest);
      }
    },
    reset: () => {
      setId(null); // This decision can be debated.
      PostUI.reset?.();
      PutUI.reset?.();
    },
  };
}

function useAsyncGetAndSaveUI<Response extends Entity, ListResponse = Response>(
  getHook: AsyncGetUIProps<ListResponse>,
  saveHook:
    | ReturnType<PostApiHook<Response>>
    | ReturnType<PutApiHook<Response>>,
  /**
   * @deprecated instead of this param, you can use promise from trigger request
   */
  onSuccess?: (response: PutResponse | PostResponse) => void,
  /**
   * @deprecated instead of this param, you can use promise from trigger request
   */
  onFailure?: (error: Error) => void
) {
  const GetUI: AsyncGetUIClass<ListResponse> = useAsyncGetUI<ListResponse>({
    shouldHandleLoading: false,
    ...getHook,
  });

  const PutUI = useAsyncPutUI({
    ...saveHook,
    onSuccess,
    onFailure,
  } as AsyncPutUIProps<Response, PostResponse | PutResponse>);

  const [asyncUI, _] = useState(() => ({
    Wrapper: (props: AsyncUIWrapperProps) => {
      const propsWithoutChildren = Object.assign({}, props);
      delete propsWithoutChildren["children"];

      const GetWrapper = GetUI.Wrapper;
      const PutWrapper = PutUI.Wrapper;

      return (
        <PutWrapper {...propsWithoutChildren}>
          <GetWrapper {...props} />
        </PutWrapper>
      );
    },
    asyncUI1: GetUI,
    asyncUI2: PutUI,
    getResponse: GetUI.getResponse,
    triggerRequest: (
      req: Omit<Response, "id"> & Partial<Pick<Response, "id">>
    ): Promise<PutResponse | PostResponse> => {
      return new Promise((resolve, reject) => {
        if (saveHook.type === "POST" || req.id != null) {
          PutUI.triggerRequest(req as Response)
            .then((response) => {
              GetUI.reset?.();
              resolve(response);
            })
            .catch(reject);
        } else {
          Modal.error({
            title: "Error - 404: ID required when updating entity",
            content:
              "ID not found. Please try again or try creating a new entity",
            okButtonProps: {
              id: "id-not-found-error-ack-btn",
            },
          });
          reject("404: ID required when updating entity");
        }
      });
    },
    reset: () => {
      GetUI.reset?.();
      PutUI.reset?.();
    },
  }));
  return asyncUI;
}

/************** Wrapper here **************/

export type AsyncGetAndPostUIType<T extends Entity> = _AsyncGetAndPostUI<T>;
export function useAsyncGetAndPostUI<Response extends Entity>(
  getHook: AsyncGetUIProps<Response>,
  postHook: ReturnType<PostApiHook<Response>>
): AsyncGetAndPostUIType<Response> {
  return useAsyncGetAndSaveUI<Response>(
    getHook,
    postHook
  ) as AsyncGetAndPostUIType<Response>;
}

export type AsyncGetAndPutUIType<T extends Entity> = _AsyncGetAndPutUI<T>;
export function useAsyncGetAndPutUI<Response extends Entity>(
  getHook: AsyncGetUIProps<Response>,
  putHook: ReturnType<PutApiHook<Response>>,
  /**
   * @deprecated instead of this param, you can use promise from trigger request
   */
  onSuccess?: (response: PutResponse) => void,
  /**
   * @deprecated instead of this param, you can use promise from trigger request
   */
  onFailure?: (error: Error) => void
): AsyncGetAndPutUIType<Response> {
  return useAsyncGetAndSaveUI<Response>(
    getHook,
    putHook,
    onSuccess as (response: PutResponse | PostResponse) => void,
    onFailure
  ) as AsyncGetAndPutUIType<Response>;
}

export type AsyncListAndPutUIType<K, T extends Entity> = _AsyncListAndPutUI<
  K,
  T
>;
export function useAsyncListAndPutUI<ListResponse, Response extends Entity>(
  getHook: AsyncGetUIProps<UseListingResponseType<ListResponse>>,
  putHook: ReturnType<PutApiHook<Response>>
): AsyncListAndPutUIType<ListResponse, Response> {
  return useAsyncGetAndSaveUI<Response, ListResponse>(
    getHook,
    putHook
  ) as AsyncListAndPutUIType<ListResponse, Response>;
}

export type AsyncPostAndPutUIType<T extends Entity> = _AsyncPostAndPutUI<T>;
export function useAsyncPostAndPutUI<Response extends Entity>(
  postHook: ReturnType<PostApiHook<Response>>,
  putHook: ReturnType<PutApiHook<Response>>
): AsyncPostAndPutUIType<Response> {
  return useAsyncCreateAndSaveUI<Response>(postHook, putHook);
}
