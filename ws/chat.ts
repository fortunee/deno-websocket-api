import { WebSocket } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let sockets = new Map<string, WebSocket>();

const chatConn = async (ws: WebSocket) => {
  console.log('New soocket connection...');

  const randomUniqueId = v4.generate();
  sockets.set(randomUniqueId, ws);

  console.log(sockets)
}

export { chatConn };
