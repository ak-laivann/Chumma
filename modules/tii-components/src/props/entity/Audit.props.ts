import { Entity } from "@tii/ui-core-framework";

export enum AuditStatus {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  CLOSED = "Closed",
  RE_ASSIGNED = "Re Assigned",
  ASSIGNED = "Assigned",
  PENDING_VERIFICATION = "Pending Verification",
}

export enum AuditTypes {
  LEADERSHIP = "Leadership",
  CYCLIC_SAFETY = "Cyclic Safety",
  INTERNAL = "Internal",
  ISO = "Iso",
  EXTERNAL = "External",
}

export interface Audit extends Entity {
  type: keyof typeof AuditTypes; // Select
  date: string; // DatePicker
  auditorNames: string[]; // Select
  zone: number; // Number
  department: string; // Input
  locationOrMachine: string; // Description
  observation: string; // Description
  recommendation: string; // Description
  targetDate: string; // DatePicker
  responsibility: string[]; // Description
  completionStatus: keyof typeof AuditStatus; // Dont Show
  comments: string; // Description
  overdueDate: string; // Dont Show
}
