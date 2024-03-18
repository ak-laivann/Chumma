import { createServer } from "miragejs";
import { ModelRegistry } from "./MirageModels";
import { InternalEndPointConfig } from "@tii/ui-core-framework";

export function makeServer() {
  return createServer({
    environment: "environment",
    models: ModelRegistry,
    routes() {
      this.urlPrefix = `${InternalEndPointConfig}/api`;
      this.timing = 1000;
      this.passthrough((request) => !(request.queryParams?.useMirage ?? false));
    },
    seeds(server) {},
  });
}
