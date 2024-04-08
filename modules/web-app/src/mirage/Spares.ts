import { faker } from "@faker-js/faker";
import { Registry, Response } from "miragejs";
import { RouteHandler } from "miragejs/server";
import { ModelRegistry } from "./MirageModels";
import { Spare } from "@tii/components";

export function getSpare(): Spare {
  console.log("inside the getspares function");
  return {
    buId: faker.company.name(),
    isInsideCupboard: faker.datatype.boolean(),
    description: faker.lorem.paragraph(3),
    id: faker.datatype.uuid(),
    minimumNumber: faker.datatype.number({ max: 3, min: 0 }),
    name: faker.lorem.word(6),
    cupboardName: faker.lorem.word(5),
    department: "MECHANICAL",
    itemCode: faker.lorem.word(6),
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

export const mockGetSpare: RouteHandler<
  Registry<typeof ModelRegistry, any>,
  any
> = (schema, request) => {
  console.log("inside the get spare function in mirage spares file");
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
