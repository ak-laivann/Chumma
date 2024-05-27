import { Registry, Response } from "miragejs";
import { RouteHandler } from "miragejs/server";
import { ModelRegistry } from "./MirageModels";
import { faker } from "@faker-js/faker";

export const mockUploadAuditFile: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  let auditFileBody = JSON.parse(request.requestBody);
  auditFileBody.id = faker.datatype.uuid();
  schema.create("auditFile", auditFileBody);
  return "OK";
};
