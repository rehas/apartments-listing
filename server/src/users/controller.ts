import {JsonController, Body, Post, BadRequestError} from 'routing-controllers'
import User from './entity';
import { sign } from '../jwt';

@JsonController()
export default class UserController{

  @Post('/users/signup')
  async signup(
    @Body() data : User
  ){

    
    const {fullName, email, password, userType} = data
    
    if(await User.findOne({where: {email}})){
      throw new BadRequestError("This email address is taken, please login or signup with a different address")
    }

    const entity = User.create({fullName, email, userType})

    // entity.email = email

    await entity.setPassword(password)

    const user = entity.save()

    return user
    
  }

  @Post('/users/login')
  async login(
    @Body() {email, password}
  ){
    const user = await User.findOne({where: {email}})
    
    // Check if User exists
    if (!user || !user.id) {
      throw new BadRequestError('A user with this email does not exist') // Can be changed to same error message as below to give less info to attackers
    }

    // Check if password is correct

    if(!await user.checkPassword(password)){
      throw new BadRequestError('Username or Password is incorrect')
    }

    const jwt = sign({ id: user.id })
    return { jwt }
  }

}