import { createConnection } from 'typeorm'
import { DefaultNamingStrategy } from 'typeorm/naming-strategy/DefaultNamingStrategy'
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface'
import { snakeCase } from 'typeorm/util/StringUtils'
import User from './users/entity';
import Apartment from './apartments/entity';

const dbname = 'apartments' 
const db_username = 'postgres'
const db_pwd = 'secret'

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName) + 's';
  }

  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return snakeCase(embeddedPrefixes.concat(customName ? customName : propertyName).join("_"));
  }

  columnNameCustomized(customName: string): string {
    return customName;
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
}

export default () =>
  createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL || `postgres://${db_username}:${db_pwd}@localhost:5432/${dbname}`,
    entities:[
      User,
      Apartment
    ],
    synchronize: true, 
    logging: true,
    namingStrategy: new CustomNamingStrategy(),
    migrations: ["migration/*.js"],
    cli: {
      migrationsDir: "migration"
    }
  })
    .then(async connection=> {
      if(!await User.findOne({where: {email: "john@doe.com"}})){

        let user = new User();
        user.fullName = "Jon Doe";
        user.email = "john@doe.com";
        await user.setPassword('password');
        user.userType = 'admin'
    
        const userRepo = connection.getRepository(User)
    
        await userRepo.save(user);

        console.log("Added first admin user - john@doe.com - password")
      }

    if(! await Apartment.findOne({where: {description:"First Apartment from migrations"}})){
      let A = new Apartment();
      A.name = "First Entry";
      A.description = "First Apartment from migrations";
      A.available = true;
      A.lat = 52.35;
      A.lon = 4.90;
      A.numberOfRooms = 3;
      A.pricePerMonth = 1100;
      A.floorAreaSize = 110;
      const johnuser = await User.findOne({where: {email: "john@doe.com"}})
      if(johnuser){
        A.user = johnuser
      }
  
      let apartmentRepository = connection.getRepository(Apartment);
  
      await apartmentRepository.save(A);
      console.log("Added first apartment in Amsterdam")

    }
  })
    .then(_ => console.log('Connected to Postgres with TypeORM'))
