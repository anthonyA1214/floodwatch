ALTER TABLE "reports" RENAME COLUMN "reported_by_admin" TO "is_admin";--> statement-breakpoint
ALTER TABLE "comments" ADD COLUMN "is_admin" boolean DEFAULT false NOT NULL;