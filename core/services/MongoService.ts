import * as mongoose from 'mongoose';

export default class MongoService {
  private connection: any = mongoose.connection;

  constructor(
    private readonly dbHost: string,
    private readonly dbPort: string,
    private readonly dbName: string
  ) {
    this.dbHost = dbHost;
    this.dbPort = dbPort;
    this.dbName = dbName;
  }

  public async connect(): Promise<any> {
    const connectionPromise = new Promise((resolve: () => void) =>
      this.connection.on('connected', () => {
        console.log('Mongo connected');
        resolve();
      }));

    this.connection.on('reconnected', () => {
      console.log('Mongo reconnected');
    });

    mongoose
      .connect(this.composeConnectionUrl(), {useNewUrlParser: true})
      .catch((err: Error) => {
        console.error('Mongo connection failed', err);
      });

    return connectionPromise;
  }

  private composeConnectionUrl(): string {
    return `mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`;
  }
}
