import MongoService from './MongoService';
import UserPasswordService from './UserPasswordService';

const SERVICES = {
  mongo: 'mongo',
  userPassword: 'userPassword'
};

export default class ServiceFacade {
  private services: Map<string, any> = new Map();

  constructor() {
    this.services.set(
      SERVICES.mongo,
      new MongoService(
        process.env.DB_HOST,
        process.env.DB_PORT,
        process.env.DB_NAME
      )
    );

    this.services.set(
      SERVICES.userPassword,
      new UserPasswordService(
        Number.parseInt(process.env.USER_PASSWORD_SALT_LENGTH, 10))
    );
  }

  public getMongoService(): MongoService {
    return this.services.get(SERVICES.mongo);
  }

  public getUserPasswordService(): UserPasswordService {
    return this.services.get(SERVICES.userPassword);
  }
}
