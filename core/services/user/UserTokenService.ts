import * as jwt from 'jsonwebtoken';

interface IJwtUserPayload {
  id: string
}

export default class UserTokenService {
  constructor(
    private readonly privateKey: string,
    private readonly tokenExpirationTime: number
  ) {
    this.privateKey = privateKey;
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

  private decorateJwtResponse(resolve: any, reject: any) {
    return (err: Error, result: any): () => void => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    };
  }
}
