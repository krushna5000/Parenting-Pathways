-- Create addresses table for storing multiple addresses per user
CREATE TABLE IF NOT EXISTS public.addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    label TEXT, -- e.g., 'Home', 'Work', etc.
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    taluka TEXT NOT NULL,
    pincode TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Index for quick lookup
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON public.addresses(user_id);

-- Enable RLS
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Policy: Only allow users to access their own addresses
CREATE POLICY "Allow user access to own addresses" ON public.addresses
  FOR ALL TO authenticated
  USING (user_id = auth.uid()); 