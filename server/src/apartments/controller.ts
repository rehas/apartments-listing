import { JsonController, Post, CurrentUser, Body, Authorized, UnauthorizedError, QueryParams, Get } from "routing-controllers";
import Apartment from "./entity";
import User from "../users/entity";
import { Between, Not, IsNull } from "typeorm";

@JsonController()
export default class ApartmentsController{
  @Authorized(["realtor", "admin"])
  @Post('/apartments/')
  async createApartment(
    @CurrentUser() user : User,
    @Body() data : Apartment
  ){
    console.log("Current User is:")
    console.log(user)

    if(!user){
      return new UnauthorizedError("Please login")
    }

    const newApartment = Apartment.create(data);
    newApartment.user = user;

    await newApartment.save()

    return newApartment
  }

  @Authorized(["realtor", "admin", "client"])
  @Get('/apartments')
  async getApartments(
    @CurrentUser() user: User,
    @QueryParams() params
  ){
    console.log(params)
    console.log(user)

    if(!user){
      return new UnauthorizedError("Please login")
    }

    let {sizeMax, sizeMin, priceMax, priceMin, norMax, norMin, available, ...rest} = params

    console.log({
      sizeMax: isNaN(sizeMax), 
      sizeMin: isNaN(sizeMin), 
      priceMax : isNaN(priceMax),
      priceMin : isNaN(priceMin),
      norMax: isNaN(norMax),
      norMin: isNaN(norMin),
      available: isNaN(available),
      rest: isNaN(rest)
    }
    )

    // Eliminate undefined or wrong query params also convert strings into proper primitive types (int, bool)

    sizeMax   = !isNaN(sizeMax)  ? sizeMax  : Math.pow(2, 16)
    sizeMin   = !isNaN(sizeMin)  ? sizeMin  : 0
    priceMax  = !isNaN(priceMax) ? priceMax : Math.pow(2, 16)
    priceMin  = !isNaN(priceMin) ? priceMin : 0
    norMax    = !isNaN(norMax)  ? norMax   : Math.pow(2, 16)
    norMin    = !isNaN(norMin)  ? norMin   : 0
    available = available === 'true' ? true : available === 'false' ? false : null;

    

    const searchQuery = {
      floorAreaSize : Between(sizeMin, sizeMax),
      pricePerMonth : Between(priceMin, priceMax),
      numberOfRooms : Between(norMin, norMax),
      available : (available===null)? Not(IsNull()) : available
    }

    console.log(searchQuery)

    

    return await Apartment.find({where: searchQuery})

  }

}