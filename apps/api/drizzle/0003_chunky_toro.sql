CREATE TYPE "public"."comment_report_reason" AS ENUM('misinformation', 'wrong_pinned_location', 'not_disaster_related', 'harmful_panic_content');--> statement-breakpoint
CREATE TYPE "public"."comment_report_status" AS ENUM('pending', 'reviewed', 'resolved', 'dismissed');--> statement-breakpoint
ALTER TABLE "reports" DROP CONSTRAINT "reports_verifier_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "comment_reports" ALTER COLUMN "reason" SET DATA TYPE "public"."comment_report_reason" USING "reason"::"public"."comment_report_reason";--> statement-breakpoint
ALTER TABLE "comment_reports" ALTER COLUMN "reason" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comment_reports" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "comment_reports" ADD COLUMN "status" "comment_report_status" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "comment_reports" ADD COLUMN "reviewed_by" integer;--> statement-breakpoint
ALTER TABLE "comment_reports" ADD COLUMN "reviewed_at" timestamp;--> statement-breakpoint
ALTER TABLE "comment_reports" ADD CONSTRAINT "comment_reports_reviewed_by_users_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_verifier_id_users_id_fk" FOREIGN KEY ("verifier_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;