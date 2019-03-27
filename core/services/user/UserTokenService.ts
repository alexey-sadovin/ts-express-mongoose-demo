import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

interface IJwtUserPayload {
  id: string
}

export default class UserTokenService {
  private readonly privateKey: Buffer;

  constructor(
    private privateKeyPath: string,
    private readonly tokenExpirationTime: number
  ) {
    this.privateKey = fs.readFileSync(privateKeyPath);
    this.tokenExpirationTime = tokenExpirationTime;
  }

  public encode(user: IJwtUserPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        user,
        this.privateKey,
        {expiresIn: this.tokenExpirationTime},
        this.decorateJwtResponse(resolve, reject)
      );
    });
  }

  public decode(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.privateKey,
        this.decorateJwtResponse(resolve, reject)
      );
    });
  }

  private decorateJwtResponse(resolve: Function, reject: Function) {
    return (err: Error, result: any): () => void => {
      if (err) {
        return reject(err)
      }
      resolve(result);
    };
  }
}
