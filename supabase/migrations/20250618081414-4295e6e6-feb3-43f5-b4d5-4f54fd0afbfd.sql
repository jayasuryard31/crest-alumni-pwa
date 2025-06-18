
-- Drop existing tables (in correct order to handle dependencies)
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS chapters CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS institutions CASCADE;

-- Create the new alumni table for the Indian college system
CREATE TABLE public.alumni (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    usn VARCHAR(50) UNIQUE NOT NULL, -- University Serial Number
    batch VARCHAR(10) NOT NULL,
    course VARCHAR(100) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'India' NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    current_position VARCHAR(255),
    current_company VARCHAR(255),
    profile_photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_approved BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_alumni_email ON public.alumni(email);
CREATE INDEX idx_alumni_usn ON public.alumni(usn);
CREATE INDEX idx_alumni_batch ON public.alumni(batch);
CREATE INDEX idx_alumni_course ON public.alumni(course);
CREATE INDEX idx_alumni_branch ON public.alumni(branch);

-- Add email validation constraint
ALTER TABLE public.alumni 
ADD CONSTRAINT valid_email 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add phone validation constraint
ALTER TABLE public.alumni 
ADD CONSTRAINT valid_phone 
CHECK (phone ~* '^[6-9][0-9]{9}$'); -- Indian mobile number format

-- Add pincode validation constraint
ALTER TABLE public.alumni 
ADD CONSTRAINT valid_pincode 
CHECK (pincode ~* '^[1-9][0-9]{5}$'); -- Indian pincode format

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_alumni_updated_at
    BEFORE UPDATE ON public.alumni
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (even though we're not using Supabase auth, it's good practice)
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows alumni to only see their own data when logged in
CREATE POLICY "Alumni can only view their own data" 
ON public.alumni 
FOR ALL 
USING (id = current_setting('app.current_user_id', true)::uuid);
