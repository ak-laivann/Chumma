import { PostAuditFileDAO, PostAuditFileRequest } from "../../../dao";
import { MutationStatus } from "@tanstack/react-query";
import { UploadFile } from "antd";
import { UserContext, useMutationWithMetaData } from "@tii/ui-core-framework";
import { useContext } from "react";

export interface AuditFileUploadPageProps {
  onFileUpload: (files: UploadFile<any>) => void;
  fileUploadStatus: MutationStatus;
  resetFileUpload: () => void;
}

const usePostAuditFile = () => {
  const { mutationResult } = useMutationWithMetaData<
    PostAuditFileRequest,
    string
  >(new PostAuditFileDAO());
  console.log("inside the data fetcher");
  return {
    fileUpload: mutationResult.mutate,
    fileUploadStatus: mutationResult.status,
    resetFileUpload: mutationResult.reset,
  };
};

export const AddAuditFileUploadDataFetcher = (): AuditFileUploadPageProps => {
  const { fileUpload, fileUploadStatus, resetFileUpload } = usePostAuditFile();

  const { buId, id: userId, departmentId } = useContext(UserContext);
  return {
    onFileUpload: (files) => fileUpload({ files, departmentId, buId, userId }),
    fileUploadStatus,
    resetFileUpload,
  };
};
