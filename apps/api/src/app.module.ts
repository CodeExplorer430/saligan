import { Module } from "@nestjs/common";

import { ExportsModule } from "./modules/exports/exports.module.js";
import { HealthModule } from "./modules/health/health.module.js";
import { InternshipsModule } from "./modules/internships/internships.module.js";
import { ReportsModule } from "./modules/reports/reports.module.js";
import { SchedulesModule } from "./modules/schedules/schedules.module.js";
import { TimeLogsModule } from "./modules/time-logs/time-logs.module.js";
import { UsersModule } from "./modules/users/users.module.js";

@Module({
  imports: [
    HealthModule,
    UsersModule,
    InternshipsModule,
    SchedulesModule,
    TimeLogsModule,
    ReportsModule,
    ExportsModule,
  ],
})
export class AppModule {}
