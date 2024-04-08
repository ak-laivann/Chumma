import { Model } from "miragejs";

export const ModelRegistry = {
  user: Model.extend<any>({}),
  spare: Model.extend<any>({}),
};
