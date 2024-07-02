import { faker } from "@faker-js/faker";
import { Audit, AuditStatus } from "@tii/components";
import { Registry, Response } from "miragejs";
import { RouteHandler } from "miragejs/server";
import { ModelRegistry } from "./MirageModels";

const toCamelCase = (str: string) => {
  return str
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toLowerCase() + word.slice(1).toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
};

const auditStatuses = Object.values(AuditStatus).map(toCamelCase);

export function getAuditOwnership(i: Audit["completionStatus"]): Audit {
  const types: Audit["type"][] = [
    "LEADERSHIP",
    "CYCLIC_SAFETY",
    "INTERNAL",
    "ISO",
    "EXTERNAL",
  ];

  const departments: Audit["department"][] = [
    "Tooling",
    "Drawbench",
    "OTO Mill",
    "VAI Mill",
    "VAC",
    "Production",
    "Planning",
    "Electrical Maintenance",
    "Mechanical Maintenance",
    "Finishing",
    "HR",
    "Safety",
    "Canteen",
    "Packing",
  ];
  return {
    auditorNames: [faker.name.fullName()],
    comments: faker.lorem.lines(2),
    completionStatus: i,
    buId: faker.company.name(),
    id: faker.datatype.uuid(),
    date: faker.date.soon(faker.datatype.number()).toString(),
    department:
      departments[
        faker.datatype.number({ min: 0, max: departments.length - 1 })
      ],
    locationOrMachine: faker.lorem.paragraphs(4),
    observation: faker.lorem.paragraphs(3),
    targetDate: faker.date.soon(faker.datatype.number()).toString(),
    overdueDate:
      faker.datatype.number({ min: 1, max: 100 }).toString() + " " + "days",
    recommendation: faker.lorem.paragraphs(2),
    responsibility: [faker.name.firstName()],
    type: types[faker.datatype.number({ min: 0, max: types.length - 1 })],
    zone: faker.datatype.number({ min: 1, max: 25 }),
  };
}

export const mockListAuditOwnerships: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  const requestBody = JSON.parse(request.requestBody) as {
    queryId: string;
    type?: string;
  }[];
  console.log("body =>", requestBody);

  const responseData = auditStatuses.reduce((acc, status) => {
    const models = schema.all(status).models;

    if (!!requestBody[0].type && requestBody[0].type !== "all") {
      const type = requestBody[0].type;
      const something = models
        //@ts-ignore
        .map((model) => model.attrs)
        // @ts-ignore
        .filter((i) => i.type.toLowerCase() == type.toLowerCase());
      acc[status] = {
        total: something.length,
        records: something,
      };
    } else {
      acc[status] = {
        total: models.length,
        records: models.map((model) => model.attrs),
      };
    }
    return acc;
  }, {} as Record<string, { total: number; records: any[] }>);

  return new Response(200, {}, responseData);
};

export const mockGetAudit: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  const sampleData = schema.all("audit").models;

  return sampleData[0].attrs;
};

export const mockPutAudit: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  let auditBody = JSON.parse(request.requestBody);
  schema.create("audit", auditBody);

  return new Response(200, {}, { status: "SUCCESS" });
};

export const mockPostAudit: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  let auditBody = JSON.parse(request.requestBody);
  auditBody.id = faker.datatype.uuid();
  schema.create("audit", auditBody);
  return new Response(200, {}, { id: auditBody.id });
};
