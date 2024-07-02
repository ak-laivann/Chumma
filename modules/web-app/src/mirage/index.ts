import { createServer } from "miragejs";
import { ModelRegistry } from "./MirageModels";
import { InternalEndPointConfig } from "@tii/ui-core-framework";
import { getUser, mockGetUser } from "./Users";
import {
  getSpare,
  mockListSpare,
  mockGetSpare,
  mockPutSpare,
  mockPostSpare,
} from "./Spares";
import { mockUploadAuditFile } from "./UploadAuditFile";
import {
  getAuditOwnership,
  mockListAuditOwnerships,
  mockGetAudit,
  mockPostAudit,
  mockPutAudit,
} from "./Audit";

export function makeServer() {
  return createServer({
    models: ModelRegistry,
    routes() {
      this.urlPrefix = `${InternalEndPointConfig["development"]}/api`;
      console.log("Server", this.urlPrefix);

      this.timing = 1000;
      this.get("/users", mockGetUser);
      this.post("/uploadAuditFile", mockUploadAuditFile);
      this.post("/usePostToMultiSearch/spares", mockListSpare);
      this.post("/usePostToMultiSearch/audits", mockListAuditOwnerships);
      this.get("/v1/bus/:buId/spares/:spareId", mockGetSpare);
      this.put("/v1/bus/:buId/spares/:spareId", mockPutSpare);
      this.post("/v1/bus/:buId/spares", mockPostSpare);
      this.get("/v1/bus/:buId/audits/:auditId", mockGetAudit);
      this.put("/v1/bus/:buId/audits/:auditId", mockPutAudit);
      this.post("/v1/bus/:buId/audits", mockPostAudit);
      this.passthrough();
    },
    seeds(server) {
      server.create("user", getUser());
      for (let i = 0; i < 100; i++) {
        server.create("spare", getSpare());
        server.create("audit", getAuditOwnership("ASSIGNED"));
      }
      for (let i = 0; i < 79; i++) {
        server.create("assigned", getAuditOwnership("ASSIGNED"));
      }
      for (let i = 0; i < 68; i++) {
        server.create("closed", getAuditOwnership("CLOSED"));
      }
      for (let i = 0; i < 55; i++) {
        server.create("inProgress", getAuditOwnership("IN_PROGRESS"));
      }
      for (let i = 0; i < 20; i++) {
        server.create("open", getAuditOwnership("OPEN"));
      }
      for (let i = 0; i < 123; i++) {
        server.create(
          "pendingVerification",
          getAuditOwnership("PENDING_VERIFICATION")
        );
      }
      for (let i = 0; i < 12; i++) {
        server.create("reAssigned", getAuditOwnership("RE_ASSIGNED"));
      }
    },
  });
}
