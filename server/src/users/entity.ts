import {Entity, BaseEntity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt'


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
  @Column('text', {nullable:false})
  userType : string // Should only be one of client, realtor, admin

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}
