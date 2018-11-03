import {useKoaServer, Action} from 'routing-controllers';
import {Server} from 'http';
import * as Koa from 'koa';

import setupDb from './db'
import UserController from './users/controller';
import ApartmentsController from './apartments/controller';
import { verify } from './jwt';
import User from './users/entity';

const app = new Koa();
const server = new Server(app.callback());
const port = process.env.PORT || 4000;


useKoaServer(app, {
  cors: true,
  controllers:[
    UserController,
    ApartmentsController
  ],
  authorizationChecker : async (action: Action, roles: String[]) => {
    console.log(`Authorization checked  - ${roles}`)
    console.log(action)

    const header: string = action.request.headers.authorization

    if (header && header.startsWith('Bearer ')) {
      const [, token] = header.split(' ')
      if (token) {
        const verified = await verify(token)
        const user = await User.findOne(verified)
        if(user && roles.includes(user.userType)){
          return true
        }
      }
      return false
    }
    return false
  },
  currentUserChecker: async (action:Action) =>{
    // Implement JWT token check and return the user object
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      
      if (token) {
        const {id} = verify(token)
        return User.findOne(id)
      }
    }
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
