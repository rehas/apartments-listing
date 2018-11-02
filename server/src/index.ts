import {useKoaServer} from 'routing-controllers';
import {Server} from 'http';
import * as Koa from 'koa';

import setupDb from './db'
import UserController from './users/controller';

const app = new Koa();
const server = new Server(app.callback());
const port = process.env.PORT || 4000;

useKoaServer(app, {
  cors: true,
  controllers:[
    UserController
  ]
})

setupDb()
  .then(_=> {
    console.log("DB Init Complete")
    server.listen(port, x=> console.log("Koa Server alive!" + x))
  })
  .catch(err=> console.log(err))
