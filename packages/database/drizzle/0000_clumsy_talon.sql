CREATE TYPE "public"."internship_status" AS ENUM('draft', 'active', 'paused', 'completed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."organization_type" AS ENUM('school', 'company', 'department', 'personal');--> statement-breakpoint
CREATE TYPE "public"."report_period_type" AS ENUM('daily', 'weekly', 'monthly', 'custom');--> statement-breakpoint
CREATE TYPE "public"."report_status" AS ENUM('draft', 'submitted', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."review_decision" AS ENUM('approved', 'rejected', 'correction_requested');--> statement-breakpoint
CREATE TYPE "public"."review_state" AS ENUM('draft', 'submitted', 'approved', 'rejected', 'correction_requested');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('intern', 'supervisor', 'coordinator', 'admin');--> statement-breakpoint
CREATE TYPE "public"."segment_source" AS ENUM('manual', 'clock', 'sync_import', 'correction');--> statement-breakpoint
CREATE TYPE "public"."segment_type" AS ENUM('work', 'break');--> statement-breakpoint
CREATE TYPE "public"."sync_action" AS ENUM('create', 'update', 'delete');--> statement-breakpoint
CREATE TYPE "public"."sync_status" AS ENUM('pending', 'processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."time_entry_status" AS ENUM('draft', 'present', 'late', 'undertime', 'overtime', 'absent', 'rest_day', 'holiday', 'fieldwork');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'disabled');--> statement-breakpoint
CREATE TABLE "memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(200) NOT NULL,
	"type" "organization_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"password_hash" text NOT NULL,
	"display_name" varchar(200) NOT NULL,
	"status" "user_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "internship_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"intern_user_id" uuid NOT NULL,
	"organization_id" uuid NOT NULL,
	"supervisor_user_id" uuid,
	"role_title" varchar(120) NOT NULL,
	"company_name" varchar(200) NOT NULL,
	"department_name" varchar(200),
	"target_minutes" integer NOT NULL,
	"timezone" varchar(100) NOT NULL,
	"start_date" date NOT NULL,
	"expected_end_date" date,
	"status" "internship_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "internship_plans_target_minutes_positive" CHECK ("internship_plans"."target_minutes" > 0),
	CONSTRAINT "internship_plans_expected_end_after_start" CHECK ("internship_plans"."expected_end_date" is null or "internship_plans"."expected_end_date" >= "internship_plans"."start_date")
);
--> statement-breakpoint
CREATE TABLE "schedule_rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"internship_plan_id" uuid NOT NULL,
	"day_of_week" integer NOT NULL,
	"shift_start" time NOT NULL,
	"shift_end" time NOT NULL,
	"break_start" time,
	"break_end" time,
	"overtime_allowed" boolean DEFAULT false NOT NULL,
	"is_workday" boolean DEFAULT true NOT NULL,
	CONSTRAINT "schedule_rules_day_range" CHECK ("schedule_rules"."day_of_week" between 1 and 7),
	CONSTRAINT "schedule_rules_shift_order" CHECK ("schedule_rules"."shift_end" > "schedule_rules"."shift_start"),
	CONSTRAINT "schedule_rules_break_pair" CHECK (("schedule_rules"."break_start" is null and "schedule_rules"."break_end" is null) or ("schedule_rules"."break_start" is not null and "schedule_rules"."break_end" is not null and "schedule_rules"."break_end" > "schedule_rules"."break_start"))
);
--> statement-breakpoint
CREATE TABLE "audit_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_user_id" uuid,
	"organization_id" uuid,
	"action" varchar(120) NOT NULL,
	"entity_type" varchar(80) NOT NULL,
	"entity_id" uuid,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_decisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reviewer_user_id" uuid NOT NULL,
	"entity_type" varchar(80) NOT NULL,
	"entity_id" uuid NOT NULL,
	"decision" "review_decision" NOT NULL,
	"comment" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sync_operations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"device_id" varchar(200) NOT NULL,
	"operation_id" varchar(200) NOT NULL,
	"entity_type" varchar(80) NOT NULL,
	"action" "sync_action" NOT NULL,
	"status" "sync_status" DEFAULT 'pending' NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"processed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "attachments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_user_id" uuid NOT NULL,
	"entity_type" varchar(80) NOT NULL,
	"entity_id" uuid NOT NULL,
	"filename" varchar(255) NOT NULL,
	"content_type" varchar(150) NOT NULL,
	"storage_path" text NOT NULL,
	"size_bytes" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "attachments_size_nonnegative" CHECK ("attachments"."size_bytes" >= 0)
);
--> statement-breakpoint
CREATE TABLE "report_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"internship_plan_id" uuid NOT NULL,
	"period_type" "report_period_type" NOT NULL,
	"period_start" date NOT NULL,
	"period_end" date NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"status" "report_status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "report_entries_period_order" CHECK ("report_entries"."period_end" >= "report_entries"."period_start")
);
--> statement-breakpoint
CREATE TABLE "time_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"internship_plan_id" uuid NOT NULL,
	"work_date" date NOT NULL,
	"status" time_entry_status DEFAULT 'draft' NOT NULL,
	"review_state" "review_state" DEFAULT 'draft' NOT NULL,
	"computed_regular_minutes" integer DEFAULT 0 NOT NULL,
	"computed_overtime_minutes" integer DEFAULT 0 NOT NULL,
	"computed_undertime_minutes" integer DEFAULT 0 NOT NULL,
	"correction_reason" text,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "time_entries_nonnegative_minutes" CHECK ("time_entries"."computed_regular_minutes" >= 0 and "time_entries"."computed_overtime_minutes" >= 0 and "time_entries"."computed_undertime_minutes" >= 0),
	CONSTRAINT "time_entries_positive_version" CHECK ("time_entries"."version" > 0)
);
--> statement-breakpoint
CREATE TABLE "time_segments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"time_entry_id" uuid NOT NULL,
	"segment_type" "segment_type" NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone,
	"source" "segment_source" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "time_segments_end_after_start" CHECK ("time_segments"."end_time" is null or "time_segments"."end_time" > "time_segments"."start_time")
);
--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internship_plans" ADD CONSTRAINT "internship_plans_intern_user_id_users_id_fk" FOREIGN KEY ("intern_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internship_plans" ADD CONSTRAINT "internship_plans_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internship_plans" ADD CONSTRAINT "internship_plans_supervisor_user_id_users_id_fk" FOREIGN KEY ("supervisor_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_rules" ADD CONSTRAINT "schedule_rules_internship_plan_id_internship_plans_id_fk" FOREIGN KEY ("internship_plan_id") REFERENCES "public"."internship_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_actor_user_id_users_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_events" ADD CONSTRAINT "audit_events_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_decisions" ADD CONSTRAINT "review_decisions_reviewer_user_id_users_id_fk" FOREIGN KEY ("reviewer_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sync_operations" ADD CONSTRAINT "sync_operations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_entries" ADD CONSTRAINT "report_entries_internship_plan_id_internship_plans_id_fk" FOREIGN KEY ("internship_plan_id") REFERENCES "public"."internship_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "time_entries" ADD CONSTRAINT "time_entries_internship_plan_id_internship_plans_id_fk" FOREIGN KEY ("internship_plan_id") REFERENCES "public"."internship_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "time_segments" ADD CONSTRAINT "time_segments_time_entry_id_time_entries_id_fk" FOREIGN KEY ("time_entry_id") REFERENCES "public"."time_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "memberships_organization_user_role_unique" ON "memberships" USING btree ("organization_id","user_id","role");--> statement-breakpoint
CREATE INDEX "memberships_user_idx" ON "memberships" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "internship_plans_intern_idx" ON "internship_plans" USING btree ("intern_user_id");--> statement-breakpoint
CREATE INDEX "internship_plans_organization_idx" ON "internship_plans" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "schedule_rules_plan_day_unique" ON "schedule_rules" USING btree ("internship_plan_id","day_of_week");--> statement-breakpoint
CREATE INDEX "audit_events_organization_created_idx" ON "audit_events" USING btree ("organization_id","created_at");--> statement-breakpoint
CREATE INDEX "audit_events_entity_idx" ON "audit_events" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "review_decisions_entity_idx" ON "review_decisions" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sync_operations_user_operation_unique" ON "sync_operations" USING btree ("user_id","operation_id");--> statement-breakpoint
CREATE INDEX "sync_operations_status_idx" ON "sync_operations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "attachments_entity_idx" ON "attachments" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "report_entries_plan_period_idx" ON "report_entries" USING btree ("internship_plan_id","period_start","period_end");--> statement-breakpoint
CREATE UNIQUE INDEX "time_entries_plan_work_date_unique" ON "time_entries" USING btree ("internship_plan_id","work_date");--> statement-breakpoint
CREATE INDEX "time_entries_review_state_idx" ON "time_entries" USING btree ("review_state");--> statement-breakpoint
CREATE INDEX "time_segments_entry_idx" ON "time_segments" USING btree ("time_entry_id");