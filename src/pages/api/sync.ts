// src/pages/api/sync.ts
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

export const POST = async () => {
  try {
    // On lance la commande système pour récupérer les fichiers
    const { stdout } = await execPromise('git pull origin master && mkdir -p tmp && touch tmp/restart.txt');
    
    return new Response(JSON.stringify({ status: 'success', detail: stdout }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ status: 'error', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Pour tester si l'URL répond bien dans ton navigateur (GET)
export const GET = () => new Response("L'API Sync est prête à recevoir le Webhook GitHub.");
