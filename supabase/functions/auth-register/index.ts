
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const userData = await req.json();

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if email already exists
    const { data: existingUser } = await supabaseClient
      .from('alumni')
      .select('email')
      .eq('email', userData.email)
      .single();

    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: 'Email already registered' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if USN already exists
    const { data: existingUSN } = await supabaseClient
      .from('alumni')
      .select('usn')
      .eq('usn', userData.usn)
      .single();

    if (existingUSN) {
      return new Response(
        JSON.stringify({ success: false, message: 'USN already registered' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Hash password using bcrypt
    const bcrypt = await import('https://deno.land/x/bcrypt@v0.4.1/mod.ts');
    const hashedPassword = await bcrypt.hash(userData.password);

    // Insert alumni data
    const { error } = await supabaseClient
      .from('alumni')
      .insert({
        ...userData,
        password_hash: hashedPassword,
        is_approved: false
      });

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ success: false, message: 'Registration failed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Registration successful! Please wait for admin approval.' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
