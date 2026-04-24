// src/pages/api/github-webhook.ts
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export const POST = async () => {
  try {
    // 1. On tire les derniers changements depuis GitHub
    await execPromise('git pull origin main');
    
    // 2. On redémarre l'app Node pour vider le cache SSR (propre à o2switch)
    await execPromise('touch tmp/restart.txt');

    return new Response(JSON.stringify({ message: 'Sync OK' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Sync failed' }), { status: 500 });
  }
};