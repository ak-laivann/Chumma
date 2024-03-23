import { createServer } from "miragejs";
import { ModelRegistry } from "./MirageModels";
import { InternalEndPointConfig } from "@tii/ui-core-framework";
import { getUser, mockGetUser } from "./Users";

export function makeServer() {
  return createServer({
    environment: "dev",
    models: ModelRegistry,
    routes() {
      console.log("inside the index file of mirage");
      this.urlPrefix = `${InternalEndPointConfig["development"]}/api`;
      this.timing = 1000;
      this.get("/users", mockGetUser);
      this.passthrough((request) => !(request.queryParams?.useMirage ?? true));
    },
    seeds(server) {
      server.create("user", getUser());
    },
  });
}
