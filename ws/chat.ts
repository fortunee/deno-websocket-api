import { WebSocket, isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let sockets = new Map<string, WebSocket>();

interface IMessage {
  name: string
  msg: string
}
const broadcastMsg = (msg: IMessage) => {
  sockets.forEach((ws: WebSocket) => {
    ws.send(JSON.stringify(msg));
  })
}

const chatConn = async (ws: WebSocket) => {
  const randomUid = v4.generate();
  sockets.set(randomUid, ws);

  for await (const eventMsg of ws) {

    if (isWebSocketCloseEvent(eventMsg)) {
      sockets.delete(randomUid);
    }

    if (typeof eventMsg === 'string') {
      broadcastMsg(JSON.parse(eventMsg))
    }
  }
}

export { chatConn };
