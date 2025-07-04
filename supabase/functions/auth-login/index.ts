
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
    const { email, password } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get alumni by email
    const { data: alumni, error } = await supabaseClient
      .from('alumni')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !alumni) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email or password' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if alumni is approved
    if (!alumni.is_approved) {
      return new Response(
        JSON.stringify({ success: false, message: 'Your account is pending approval' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Hash the provided password and compare
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (hashedPassword !== alumni.password_hash) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid email or password' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update last login
    await supabaseClient
      .from('alumni')
      .update({ last_login: new Date().toISOString() })
      .eq('id', alumni.id);

    // Create JWT token (simple implementation)
    const token = btoa(JSON.stringify({ 
      id: alumni.id, 
      email: alumni.email, 
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));

    const { password_hash, ...alumniData } = alumni;

    return new Response(
      JSON.stringify({ 
        success: true, 
        token, 
        alumni: alumniData 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
