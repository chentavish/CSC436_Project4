// Returns the value, or stops the server with a clear message if it's missing
function required(name: string): string {
    const value = process.env[name];
    if (!value || !value.trim()) {
      throw new Error(
        `Missing environment variable ${name}. ` +
          'On your laptop: add it to .env (see .env.example). ' +
          "On Vercel: add it in the project's environment variable settings."
      );
    }
    return value.trim();
  }
  
  export const config = Object.freeze({
    supabaseUrl: required('SUPABASE_URL'),
    supabaseSecretKey: required('SUPABASE_SECRET_KEY'),
    port: Number(process.env.PORT ?? 3000),
    runningOnVercel: process.env.VERCEL === '1', 
  });