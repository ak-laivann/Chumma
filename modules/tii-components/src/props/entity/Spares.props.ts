import { Entity } from "@tii/ui-core-framework";

export interface Spare extends Entity {
  name: string;
  description: string;
  minimumNumber: number;
  machineName?: string[];
  machineTerminology?: string;
  presentNumbers?: number;
  unitOfMeasurement?: string;
  itemCode?: string;
  isInsideCupboard: boolean;
  cupboardName?: string;
  rackNumber?: string;
  leadTime?: string;
  suppliers?: string[];
  department?: "ELECTRICAL" | "MECHANICAL";
  // adding to blame the last 5 persons who made the update if someone chooses to vandalise the details.
  lastUpdatedBy?: string[];
  lastUpdatedTime?: string[];
}
