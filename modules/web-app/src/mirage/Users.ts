import { faker } from "@faker-js/faker";
import { Registry, Response } from "miragejs";
import { RouteHandler } from "miragejs/server";
import { ModelRegistry } from "./MirageModels";
import { UserContextObject } from "@tii/ui-core-framework";

export function getUser(): UserContextObject {
  return {
    buId: faker.company.name(),
    isSignedIn: true,
    mail: faker.internet.exampleEmail(),
    categoryId: "MS",
    departmentId: faker.commerce.department(),
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
  };
}

export const mockGetUser: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  const sampleData = schema.all("user").models;

  return new Response(200, {}, sampleData[0].attrs);
};
