import {Request, Response, NextFunction} from 'express';
import UserTokenService from './../../services/user/UserTokenService';

const TOKEN_HEADER: string = 'access-token';

class TokenDecoder {
  private tokenService: UserTokenService;

  constructor(
    private readonly req: Request,
    private readonly res: Response,
    private readonly next: NextFunction
  ) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.tokenService = res.app.locals.services.getUserTokenService();
  }

  public async decode(): Promise<void> {
    try {
      await this.tryDecode();
    } catch (err) {
      this.next(err);
    }
  }

  private async tryDecode(): Promise<void> {
    const token: string = String(this.req.headers[TOKEN_HEADER]);

    this.res.app.locals.user = await this.tokenService.decode(token);

    this.next();
  }
}

export default {
  async decode(req: Request, res: Response, next: NextFunction): Promise<void> {
    await new TokenDecoder(req, res, next).decode();
  }
};
