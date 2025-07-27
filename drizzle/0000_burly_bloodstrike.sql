CREATE TABLE "anon_profile_infos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"anon_profile_id" uuid NOT NULL,
	"ip_address" varchar(64),
	"fingerprint" varchar(255) NOT NULL,
	"user_agent" text,
	"browser" varchar(100),
	"os" varchar(100),
	"device" varchar(100),
	"carrier" varchar(100),
	"location" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "anon_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"alias" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "anon_profiles_alias_unique" UNIQUE("alias")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"receiver_id" uuid NOT NULL,
	"content" text NOT NULL,
	"anon_profile_id" uuid,
	"is_read" boolean DEFAULT false,
	"is_replied" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"display_name" text,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "anon_profile_infos" ADD CONSTRAINT "anon_profile_infos_anon_profile_id_anon_profiles_id_fk" FOREIGN KEY ("anon_profile_id") REFERENCES "public"."anon_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_anon_profile_id_anon_profiles_id_fk" FOREIGN KEY ("anon_profile_id") REFERENCES "public"."anon_profiles"("id") ON DELETE no action ON UPDATE no action;