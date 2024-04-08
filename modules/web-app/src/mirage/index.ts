import { createServer } from "miragejs";
import { ModelRegistry } from "./MirageModels";
import { InternalEndPointConfig } from "@tii/ui-core-framework";
import { getUser, mockGetUser } from "./Users";
import { getSpare, mockGetSpare } from "./Spares";

export function makeServer() {
  return createServer({
    models: ModelRegistry,
    routes() {
      this.urlPrefix = `${InternalEndPointConfig["development"]}/api`;
      console.log("Server", this.urlPrefix);

      this.timing = 1000;
      this.get("/users", mockGetUser);
      this.post("/usePostToMultiSearch/spares", mockGetSpare);
      this.passthrough();
    },
    seeds(server) {
      server.create("user", getUser());
      for (let i = 0; i < 100; i++) {
        server.create("spare", getSpare());
      }
    },
  });
}
