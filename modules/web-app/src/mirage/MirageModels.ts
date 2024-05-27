import { Model } from "miragejs";

export const ModelRegistry = {
  user: Model.extend<any>({}),
  spare: Model.extend<any>({}),
  auditFile: Model.extend<any>({}),
  audit: Model.extend<any>({}),
};
