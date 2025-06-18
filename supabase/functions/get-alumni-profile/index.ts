
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
    const { token } = await req.json();

    // Parse JWT token
    const tokenData = JSON.parse(atob(token));
    
    // Check if token is expired
    if (tokenData.exp <= Date.now()) {
      return new Response(
        JSON.stringify({ success: false, message: 'Token expired' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get alumni profile
    const { data: alumni, error } = await supabaseClient
      .from('alumni')
      .select('*')
      .eq('id', tokenData.id)
      .single();

    if (error || !alumni) {
      return new Response(
        JSON.stringify({ success: false, message: 'Alumni not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { password_hash, ...alumniData } = alumni;

    return new Response(
      JSON.stringify({ 
        success: true, 
        alumni: alumniData 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Profile fetch error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
