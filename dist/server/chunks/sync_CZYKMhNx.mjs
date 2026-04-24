import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);
const POST = async () => {
  try {
    const { stdout } = await execPromise("git pull origin master && mkdir -p tmp && touch tmp/restart.txt");
    return new Response(JSON.stringify({ status: "success", detail: stdout }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ status: "error", message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const GET = () => new Response("L'API Sync est prête à recevoir le Webhook GitHub.");

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
