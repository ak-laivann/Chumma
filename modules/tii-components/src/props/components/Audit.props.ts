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
  type: keyof typeof AuditTypes;
  date: string;
  auditorNames: string[];
  zone: number;
  department: string;
  locationOrMachine: string;
  observation: string;
  recommendation: string;
  targetDate: string;
  responsibility: string;
  completionStatus: keyof typeof AuditStatus;
  comments: string;
  overdueDate: string;
}
