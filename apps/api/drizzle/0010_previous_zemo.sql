CREATE TYPE "public"."severity" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"location" text NOT NULL,
	"range" integer NOT NULL,
	"description" text,
	"image" text,
	"severity" "severity" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "auth_accounts" DROP CONSTRAINT "auth_accounts_provider_provider_id_unique";--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "first_name_idx" ON "profile_info" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX "last_name_idx" ON "profile_info" USING btree ("last_name");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
ALTER TABLE "auth_accounts" ADD CONSTRAINT "unique_provider_provider_id" UNIQUE("provider","provider_id");