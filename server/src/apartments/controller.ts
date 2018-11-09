import { JsonController, Post, CurrentUser, Body, Authorized, UnauthorizedError, QueryParams, Get, Delete, Param, BadRequestError, NotFoundError, Patch } from "routing-controllers";
import Apartment from "./entity";
import User from "../users/entity";
import { Between, Not, IsNull } from "typeorm";

@JsonController()
export default class ApartmentsController{
  @Authorized(["realtor", "admin"])
  @Post('/apartments')
  async createApartment(
    @CurrentUser() user : User,
    @Body() data : Apartment
  ){
    console.log("Current User is:")
    console.log(user)

    if(!user){
      return new UnauthorizedError("Please login")
    }

    console.log(data)

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
    // console.log(params)
    // console.log(user)

    if(!user){
      return new UnauthorizedError("Please login")
    }

    console.log("params:\n")
    console.log(params)

    let {sizeMax, sizeMin, priceMax, priceMin, norMax, norMin, available, id, skip, name, dateAdded,  ...rest} = params

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

    // Show only available ones to clients 
    if(user.userType === 'client'){
      available = 'true'
    }

    // Eliminate undefined or wrong query params also convert strings into proper primitive types (int, bool)

    sizeMax   = (sizeMax && !isNaN(sizeMax))  ? sizeMax  : Math.pow(2, 16)
    sizeMin   = (sizeMin && !isNaN(sizeMin))  ? sizeMin  : 0
    priceMax  = (priceMax && !isNaN(priceMax)) ? priceMax : Math.pow(2, 16)
    priceMin  = (priceMin && !isNaN(priceMin)) ? priceMin : 0
    norMax    = (norMax && !isNaN(norMax))  ? norMax   : Math.pow(2, 16)
    norMin    = (norMin && !isNaN(norMin))  ? norMin   : 0
    available = available === 'true' ? true : available === 'false' ? false : null;

    

    const searchQuery = {
      floorAreaSize : Between(sizeMin, sizeMax),
      pricePerMonth : Between(priceMin, priceMax),
      numberOfRooms : Between(norMin, norMax),
      available : (available===null)? Not(IsNull()) : available
    }

    console.log(searchQuery)

    const apartmentCount =  await Apartment.count({where: searchQuery})

    console.log(apartmentCount)

    if(!apartmentCount){
      return {
        page : [],
        count : 0
      }
    }

    const lastPage = apartmentCount%5 !==0 ? Math.floor(apartmentCount / 5) : Math.floor(apartmentCount / 5) -1

    console.log(`lastPage - ${lastPage}`)

    if( apartmentCount - (skip * 5) <= 0 ){
      skip = lastPage
    }
    console.log(`skip - ${skip}`)

    const result = await Apartment.find({
      where: searchQuery,
      order: {
        id: id===-1 ?  "ASC" : "DESC",
      },
      take: 5,
      skip: skip ? skip*5 : 0
    })

    return {
      page : result, 
      count: apartmentCount
    } 

  }

  @Authorized(["realtor", "admin"])
  @Delete('/apartments/:id([0-9]+)')
  async deleteApartment(
    @Param('id') id : number
  ){
    const apartmentToDelete = await Apartment.findOne(id)

    if(!apartmentToDelete){
      throw new NotFoundError("Apartment Not Found")
    }
    
    return await apartmentToDelete.remove()
    
  }

  @Authorized(["realtor", "admin"])
  @Patch('/apartments/:id([0-9]+)')
  async editApartment(
    @Param('id') id : number,
    @Body() data : Partial<Apartment>
  ){

    if(Object.keys(data).length === 0){
      throw new BadRequestError("Missing data for editing")
    }

    const apartmentToEdit = await Apartment.findOne(id)
    if(!apartmentToEdit){
      throw new NotFoundError("Apartment Not Found")
    }

    console.log(Object.keys(apartmentToEdit))
    console.log(Object.keys(data))

    console.log(
      Object.keys(data)
        .filter(key => (
          data[key] !== undefined && 
          (data[key].length > 0 || !isNaN(data[key]) || (data[key].lat && data[key].lon) ) && 
          Object.keys(apartmentToEdit).includes(key))
        )
    )


    Object.keys(data)
      .filter(key => (
        data[key] !==undefined && 
        (data[key].length > 0 || !isNaN(data[key]) || (data[key].lat && data[key].lon) ) && 
        Object.keys(apartmentToEdit).includes(key)))
      .forEach(key => {
        console.log(`keys for apartments -- ${key}`)
        apartmentToEdit[key] = data[key]
      })
    
    return await apartmentToEdit.save()

  } 

  @Authorized(["realtor", "admin"])
  @Get('/apartments/:id([0-9]+)')
  async getApartment(
    @Param('id') id : number,
    @CurrentUser() user: User
  ){
    if(!user){
      return new UnauthorizedError("Please login")
    }
    return await Apartment.findOne(id)
  }
}