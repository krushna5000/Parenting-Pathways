-- Add address and contact fields to order table
ALTER TABLE "public"."order" 
ADD COLUMN "shipping_address" jsonb,
ADD COLUMN "contact_details" jsonb;

-- Add comment to explain the structure
COMMENT ON COLUMN "public"."order"."shipping_address" IS 'JSON object containing: address_line1, address_line2, city, state, district, taluka, pincode';
COMMENT ON COLUMN "public"."order"."contact_details" IS 'JSON object containing: full_name, phone, email, alternate_phone'; 