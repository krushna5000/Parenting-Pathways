-- Add expo_notification_token column to users table
ALTER TABLE "public"."users" 
ADD COLUMN "expo_notification_token" text;

-- Add comment to explain the column
COMMENT ON COLUMN "public"."users"."expo_notification_token" IS 'Expo push notification token for mobile app notifications'; 