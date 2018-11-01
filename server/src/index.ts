import {useKoaServer} from 'routing-controllers';
import {Server} from 'http';
import * as Koa from 'koa';

const app = new Koa();
const server = new Server(app.callback());
const port = process.env.PORT || 4000;

useKoaServer(app, {
  cors: true,
})

server.listen(port, x=> console.log("Koa Server alive!" + x))