import {JsonController, Body, Post, BadRequestError, Authorized, Delete, Param, Patch} from 'routing-controllers'
import User from './entity';
import { sign } from '../jwt';

const userTypes = ['client', 'realtor', 'admin']

@JsonController()
export default class UserController{

  @Post('/users/signup')
  async signup(
    @Body() data :  User
  ){
    const {fullName, email, password, userType} = data

    // Check if userType is valid

    if(!userTypes.includes(userType)){
      throw new BadRequestError("Invalid User Type")
    }
    
    if(await User.findOne({where: {email}})){
      throw new BadRequestError("This email address is taken, please login or signup with a different address")
    }

    console.log(typeof userType)

    const entity = User.create({fullName, email, userType})

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

  @Authorized(["admin"])
  @Delete('/users/:userid([0-9]+)')
  async deleteUser(
    @Param('userid') userid: number
  ){

    const userToDelete = await User.findOne(userid)

    if(!userToDelete){
      throw new BadRequestError("User Not Found")
    }

    userToDelete.remove()

    return `Deleted user ${userToDelete.id}`

  }

  @Authorized(["admin"])
  @Patch('/users/:userid([0-9]+)')
  async editUser(
    @Param('userid') userid : number,
    @Body() userData : Partial<User>
  ){
    // Check if there's any form data
    if(Object.keys(userData).length === 0){
      throw new BadRequestError("Missing data for editing")
    }

    const userToBeEdited = await User.findOne(userid)

    // Check if there's such a user with provided id
    if(!userToBeEdited){
      throw new BadRequestError("User is not found")
    }

    // For the provided keys, check if the keys hold any value, the value is longer than zero and the key is not password
    // For each key, check if the key is valid and then set the value for the entity found from DB
    Object.keys(userData)
      .filter(key=> (
        userData[key] && 
        userData[key].length > 0 && 
        key !=='password' && 
        Object.keys(userToBeEdited).includes(key)))
      .forEach( key=>{
        console.log(`key is now ${key}`)
        userToBeEdited[key] = userData[key]
    })

    // Set password as hashed
    if(userData.password){
      await userToBeEdited.setPassword(userData.password)
    }

    return userToBeEdited.save()

  }

}