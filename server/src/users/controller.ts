import {JsonController, Body, Post} from 'routing-controllers'
import User from './entity';

@JsonController()
export default class UserController{

  @Post('/users')
  async signup(
    @Body() data : User
  ){
    const {fullName, email, password, userType} = data

    console.log(data);

    const entity = User.create({fullName, email, userType})

    // entity.email = email

    await entity.setPassword(password)

    const user = entity.save()

    return user
    
  }

}