import { serve } from 'https://deno.land/std/http/server.ts';
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts';
import { chatConn } from './ws/chat.ts';

const port = 3000;
const server = serve({ port });
console.log(`Server running at http://localhost:${port}`);

for await (const req of server) {
  if (req.url == '/') {
    req.respond({
      status: 200,
      body: await Deno.open('./public/index.html')
    })
  }

  if (req.url === '/ws') {
    if (acceptable(req)) {
      const ws = await acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      })

      await chatConn(ws)
    }
  }
}
