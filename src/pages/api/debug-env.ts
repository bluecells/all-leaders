// src/pages/api/debug-env.ts
export const GET = () => {
  return new Response(
    JSON.stringify({
      hasSecret: !!import.meta.env.KEYSTATIC_SECRET,
      secretLength: import.meta.env.KEYSTATIC_SECRET?.length ?? 0,
      hasClientId: !!import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID,
      hasClientSecret: !!import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
      nodeEnv: process.env.NODE_ENV,
    }),
    {
      headers: { 'content-type': 'application/json' },
    }
  );
};
