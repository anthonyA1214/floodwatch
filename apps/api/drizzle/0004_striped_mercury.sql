ALTER TABLE "comment_reports" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "comment_reports" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
DROP TYPE "public"."comment_report_status";--> statement-breakpoint
CREATE TYPE "public"."comment_report_status" AS ENUM('pending', 'resolved', 'dismissed');--> statement-breakpoint
ALTER TABLE "comment_reports" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."comment_report_status";--> statement-breakpoint
ALTER TABLE "comment_reports" ALTER COLUMN "status" SET DATA TYPE "public"."comment_report_status" USING "status"::"public"."comment_report_status";--> statement-breakpoint
ALTER TABLE "safety" ADD COLUMN "availability" varchar(100);--> statement-breakpoint
ALTER TABLE "safety" ADD COLUMN "contact_number" varchar(20);