import { faker } from "@faker-js/faker";
import { Audit } from "@tii/components";
import { Registry, Response } from "miragejs";
import { RouteHandler } from "miragejs/server";
import { ModelRegistry } from "./MirageModels";

export function getAuditOwnership(): Audit {
  return {
    auditorNames: [faker.name.fullName()],
    comments: faker.lorem.lines(2),
    completionStatus: "CLOSED", // ["ASSIGNED", "CLOSED", "IN_PROGRESS", "OPEN", "PENDING_VERIFICATION", "RE_ASSIGNED"]
    buId: faker.company.name(),
    id: faker.datatype.uuid(),
    date: faker.date.soon(faker.datatype.number()).toString(),
    department: faker.commerce.department(),
    locationOrMachine: faker.lorem.paragraphs(4),
    observation: faker.lorem.paragraphs(3),
    targetDate: faker.date.soon(faker.datatype.number()).toString(),
    overdueDate: faker.date.soon(faker.datatype.number()).toString(),
    recommendation: faker.lorem.paragraphs(2),
    responsibility: faker.lorem.paragraphs(2),
    type: faker.lorem.words(3),
    zone: faker.datatype.number(),
  };
}

export const mockListAuditOwnerships: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  const sampleData = schema.all("audit").models;

  return new Response(
    200,
    {},
    {
      all: {
        total: 100,
        records: sampleData.map((i) => i.attrs),
      },
    }
  );
};
