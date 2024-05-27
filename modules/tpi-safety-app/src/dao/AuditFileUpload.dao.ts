import { QueryObserverOptions } from "@tanstack/react-query";
import { AsyncRequest, InternalAxiosInstance } from "@tii/ui-core-framework";
import { UploadFile } from "antd";

export interface PostAuditFileRequest {
  files: UploadFile<any>;
  buId: string;
  departmentId: string;
  userId: string;
}

export class PostAuditFileDAO extends AsyncRequest<
  string,
  PostAuditFileRequest
> {
  constructor() {
    super();
  }

  getConfig = (): QueryObserverOptions<any, Error> => {
    return {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    };
  };

  getAsyncFunction = async ({
    files,
    buId,
    departmentId,
    userId,
  }: PostAuditFileRequest): Promise<string> => {
    console.log("inside dao", files);
    const res = await Promise.all([
      () => {
        let url: string = `/bus/${buId}/departments/${departmentId}/users/${userId}/auditFiles/${files.name}`;

        return InternalAxiosInstance({
          url,
          data: files.originFileObj,
          method: "POST",
          headers: {
            "Content-Type": files.type || "",
            useMirage: true,
          },
        });
      },
    ]);
    console.log("upload status", res);
    return "ok";
  };

  getCacheKey = (): string[] => {
    return [];
  };
}
