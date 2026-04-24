import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const POST = async () => {
  try {
    await execPromise("git pull origin main");
    await execPromise("touch tmp/restart.txt");
    return new Response(JSON.stringify({ message: "Sync OK" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Sync failed" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
