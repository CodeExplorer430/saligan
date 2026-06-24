import Dexie, { type EntityTable } from "dexie";

export interface LocalTimeLog {
  id: string;
  internshipPlanId: string;
  workDate: string;
  updatedAt: string;
}

export interface LocalReport {
  id: string;
  internshipPlanId: string;
  periodStart: string;
  periodEnd: string;
  updatedAt: string;
}

export interface SyncQueueItem {
  id: string;
  entityType: "time_entry" | "report_entry" | "attachment";
  action: "create" | "update" | "delete";
  status: "pending" | "processing" | "failed";
  createdAt: string;
}

export class SaliganDatabase extends Dexie {
  localTimeLogs!: EntityTable<LocalTimeLog, "id">;
  localReports!: EntityTable<LocalReport, "id">;
  syncQueue!: EntityTable<SyncQueueItem, "id">;

  constructor(name = "saligan") {
    super(name);

    this.version(1).stores({
      localTimeLogs: "id, internshipPlanId, workDate, updatedAt",
      localReports: "id, internshipPlanId, periodStart, periodEnd, updatedAt",
      syncQueue: "id, entityType, status, createdAt",
    });
  }
}

export const localDatabase = new SaliganDatabase();
