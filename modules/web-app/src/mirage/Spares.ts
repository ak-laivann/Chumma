import { faker } from "@faker-js/faker";
import { Registry, Response } from "miragejs";
import { RouteHandler } from "miragejs/server";
import { ModelRegistry } from "./MirageModels";
import { Spare } from "@tii/components";

export function getSpare(): Spare {
  return {
    buId: faker.company.name(),
    isInsideCupboard: true,
    description: faker.lorem.paragraph(3),
    id: faker.datatype.uuid(),
    minimumNumber: faker.datatype.number({ max: 3, min: 0 }),
    name: faker.lorem.word(6),
    cupboardName: faker.lorem.word(5),
    department: "MECHANICAL",
    itemCode: faker.datatype.number({ min: 100000, max: 999999 }).toString(),
    lastUpdatedBy: [],
    lastUpdatedTime: [],
    leadTime: faker.datatype.number().toString(),
    machineName: [faker.lorem.word(7), faker.lorem.word(5)],
    machineTerminology: faker.lorem.paragraph(),
    presentNumbers: faker.datatype.number(),
    rackNumber: faker.datatype.number().toString(),
    suppliers: [faker.company.name()],
    unitOfMeasurement: faker.lorem.word(),
  };
}

export const mockListSpare: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  const sampleData = schema.all("spare").models;

  return new Response(
    200,
    {},
    {
      maintenanceSpares: {
        total: 100,
        records: sampleData.map((i) => i.attrs),
      },
    }
  );
};

export const mockGetSpare: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  const sampleData = schema.all("spare").models;

  return sampleData[0].attrs;
};

export const mockPutSpare: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  let sparesBody = JSON.parse(request.requestBody);
  schema.create("spare", sparesBody);

  return new Response(200, {}, { status: "SUCCESS" });
};

export const mockPostSpare: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  let sparesBody = JSON.parse(request.requestBody);
  sparesBody.id = faker.datatype.uuid();
  schema.create("spare", sparesBody);
  return new Response(200, {}, { id: sparesBody.id });
};
