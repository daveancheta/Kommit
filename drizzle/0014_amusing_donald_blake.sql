ALTER TABLE "notification" DROP CONSTRAINT "notification_group_id_group_id_fk";
--> statement-breakpoint
ALTER TABLE "notification" DROP COLUMN "group_id";