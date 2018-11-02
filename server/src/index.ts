import {useKoaServer, Action} from 'routing-controllers';
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
  ],
  authorizationChecker : async (action: Action, roles: String[]) => {
    console.log(`Authorization checked  - ${roles}`)
    console.log(action)
    return true
    // TODO : Create role based authentication here. 
  },
  currentUserChecker: async (action:Action) =>{
    // Implement JWT token check and return the user object
    console.log("Current user is being checked")
    return undefined
  }
})


setupDb()
  .then(_=> {
    console.log("DB Init Complete")
    server.listen(port, x=> console.log("Koa Server alive!" + x))
  })
  .catch(err=> console.log(err))
