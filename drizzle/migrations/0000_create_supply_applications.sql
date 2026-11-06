CREATE TABLE public.supply_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  contact_name text NOT NULL,
  phone text NOT NULL,
  email text,
  organization_type text NOT NULL,
  supply_type text NOT NULL,
  estimated_quantity text,
  supply_frequency text NOT NULL,
  delivery_location text NOT NULL,
  message text,
  submission_key uuid NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Contacted', 'Approved', 'Declined')),
  submitted_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT supply_app_business_name_length CHECK (char_length(business_name) BETWEEN 2 AND 160),
  CONSTRAINT supply_app_contact_name_length CHECK (char_length(contact_name) BETWEEN 2 AND 120),
  CONSTRAINT supply_app_phone_length CHECK (char_length(phone) BETWEEN 7 AND 30),
  CONSTRAINT supply_app_email_length CHECK (email IS NULL OR char_length(email) <= 255),
  CONSTRAINT supply_app_organization_type CHECK (organization_type IN ('School', 'Hotel', 'Restaurant', 'Catering Company', 'Hospital', 'Retail Business', 'Event Organizer', 'Other')),
  CONSTRAINT supply_app_supply_type CHECK (supply_type IN ('Beef', 'Goat Meat', 'Chicken', 'Mixed Meat', 'Other')),
  CONSTRAINT supply_app_quantity_length CHECK (estimated_quantity IS NULL OR char_length(estimated_quantity) <= 120),
  CONSTRAINT supply_app_frequency CHECK (supply_frequency IN ('Daily', 'Weekly', 'Monthly', 'One-time Order')),
  CONSTRAINT supply_app_location_length CHECK (char_length(delivery_location) BETWEEN 2 AND 240),
  CONSTRAINT supply_app_message_length CHECK (message IS NULL OR char_length(message) <= 1200)
);
GRANT INSERT ON public.supply_applications TO anon, authenticated;
GRANT ALL ON public.supply_applications TO service_role;
ALTER TABLE public.supply_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit supply applications"
  ON public.supply_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status = 'Pending'
    AND submitted_at >= now() - interval '1 minute'
    AND submitted_at <= now() + interval '1 minute'
  );