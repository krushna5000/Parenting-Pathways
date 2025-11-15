-- Add individual address and contact columns to order table
ALTER TABLE "public"."order" 
ADD COLUMN "shipping_address_line1" text,
ADD COLUMN "shipping_address_line2" text,
ADD COLUMN "shipping_city" text,
ADD COLUMN "shipping_state" text,
ADD COLUMN "shipping_district" text,
ADD COLUMN "shipping_taluka" text,
ADD COLUMN "shipping_pincode" text,
ADD COLUMN "contact_full_name" text,
ADD COLUMN "contact_phone" text,
ADD COLUMN "contact_email" text,
ADD COLUMN "contact_alternate_phone" text;

-- Add comments to explain the columns
COMMENT ON COLUMN "public"."order"."shipping_address_line1" IS 'Primary address line (house/flat number, street)';
COMMENT ON COLUMN "public"."order"."shipping_address_line2" IS 'Secondary address line (apartment, suite, etc.)';
COMMENT ON COLUMN "public"."order"."shipping_city" IS 'City name';
COMMENT ON COLUMN "public"."order"."shipping_state" IS 'State name';
COMMENT ON COLUMN "public"."order"."shipping_district" IS 'District name';
COMMENT ON COLUMN "public"."order"."shipping_taluka" IS 'Taluka name';
COMMENT ON COLUMN "public"."order"."shipping_pincode" IS '6-digit postal code';
COMMENT ON COLUMN "public"."order"."contact_full_name" IS 'Customer full name';
COMMENT ON COLUMN "public"."order"."contact_phone" IS 'Primary phone number';
COMMENT ON COLUMN "public"."order"."contact_email" IS 'Email address';
COMMENT ON COLUMN "public"."order"."contact_alternate_phone" IS 'Alternate phone number (optional)'; 