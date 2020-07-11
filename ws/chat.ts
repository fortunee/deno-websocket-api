import { WebSocket, isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let sockets = new Map<string, WebSocket>();

interface IBroadcast {
  name: string
  msg: string
}
const broadCast = (eventMsg: IBroadcast) => {
  sockets.forEach((ws: WebSocket) => {
    ws.send(JSON.stringify(eventMsg));
  })
}

const chatConn = async (ws: WebSocket) => {
  const randomUniqueId = v4.generate();
  sockets.set(randomUniqueId, ws);

  for await (const e of ws) {

    if (isWebSocketCloseEvent(e)) {
      sockets.delete(randomUniqueId);
    }

    if (typeof e === 'string') {
      let eventMsg = JSON.parse(e);
      broadCast(eventMsg)
    }
  }
}

export { chatConn };
