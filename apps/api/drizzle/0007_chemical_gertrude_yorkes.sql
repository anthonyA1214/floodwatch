CREATE TYPE "public"."provider" AS ENUM('local', 'google');--> statement-breakpoint
CREATE TABLE "auth_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"provider" "provider" NOT NULL,
	"provider_id" varchar(255),
	"hashed_password" varchar(255),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "auth_accounts_provider_provider_id_unique" UNIQUE("provider","provider_id")
);
--> statement-breakpoint
ALTER TABLE "auth_accounts" ADD CONSTRAINT "auth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "hashed_password";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "google_id";