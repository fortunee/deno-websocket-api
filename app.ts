import { serve } from 'https://deno.land/std/http/server.ts';

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
}
