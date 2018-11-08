import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Timestamp } from "typeorm";
import { IsString, IsNumber, IsBoolean } from "class-validator";
import User from "../users/entity";

@Entity()
export default class Apartment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @IsString()
  @Column('text', {nullable:false})
  name : String

  @IsString()
  @Column('text', {nullable:false})
  description : String

  @IsNumber()
  @Column('integer', {nullable:false})
  floorAreaSize : Number

  @IsNumber()
  @Column('integer', {nullable:false})
  pricePerMonth : Number

  @IsNumber()
  @Column('integer', {nullable:false})
  numberOfRooms : Number

  @IsBoolean()
  @Column({type: 'bool', default: true})
  available : Boolean

  // TODO: Add valid geolocation coordinates
  // @IsJSON()
  // @Column({type: 'json', nullable:true})
  // geolocation: Geolocation

  @IsNumber()
  @Column({type: 'double precision', nullable:false})
  lat : number

  @IsNumber()
  @Column({type: 'double precision', nullable:false})
  lon : number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  dateAdded: Timestamp

  @ManyToOne(_=>User, user=> user.apartments, {onDelete:"CASCADE"})
  @JoinColumn({name: 'user_id'})
  user: User;

}