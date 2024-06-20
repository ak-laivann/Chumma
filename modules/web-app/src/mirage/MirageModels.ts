import { Model } from "miragejs";

export const ModelRegistry = {
  user: Model.extend<any>({}),
  spare: Model.extend<any>({}),
  auditFile: Model.extend<any>({}),
  audit: Model.extend<any>({}),
  closed: Model.extend<any>({}),
  assigned: Model.extend<any>({}),
  inProgress: Model.extend<any>({}),
  open: Model.extend<any>({}),
  pendingVerification: Model.extend<any>({}),
  reAssigned: Model.extend<any>({}),
};
