import { Entity } from "@tii/ui-core-framework";

export enum AuditStatus {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  CLOSED = "Closed",
  RE_ASSIGNED = "ReAssigned",
  ASSIGNED = "Assigned",
  PENDING_VERIFICATION = "Pending Verification",
}

export interface Audit extends Entity {
  type: string;
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
