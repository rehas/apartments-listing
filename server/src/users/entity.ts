import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import { IsString, MinLength, IsEmail} from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt'
import Apartment from '../apartments/entity';

export type Role = 'client'| 'realtor'| 'admin';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(2)
  @Column('text')
  fullName: string

  @IsEmail()
  @Column('text', {nullable:false})
  email: string

  @IsString()
  @MinLength(4)
  @Column('text')
  @Exclude({ toPlainOnly: true })
  password: string

  @IsString()
  @Column('text', {nullable:false, default:'client' })
  userType : Role // Should only be one of client, realtor, admin

  @OneToMany(_=> Apartment, apartment=> apartment.user)
  apartments : Apartment[]

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}
