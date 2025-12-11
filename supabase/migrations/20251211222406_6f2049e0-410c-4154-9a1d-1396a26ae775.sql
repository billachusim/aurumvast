-- Create enums for investment experience and risk tolerance
CREATE TYPE public.investment_experience AS ENUM ('beginner', 'intermediate', 'experienced', 'expert');
CREATE TYPE public.risk_tolerance AS ENUM ('conservative', 'moderate', 'aggressive');

-- Create profiles table with comprehensive user data
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  country TEXT NOT NULL,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  investment_experience public.investment_experience NOT NULL DEFAULT 'beginner',
  risk_tolerance public.risk_tolerance NOT NULL DEFAULT 'moderate',
  agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
  agreed_to_privacy_policy BOOLEAN NOT NULL DEFAULT false,
  kyc_verified BOOLEAN NOT NULL DEFAULT false,
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create function to generate unique referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN 'AV-' || result;
END;
$$;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();