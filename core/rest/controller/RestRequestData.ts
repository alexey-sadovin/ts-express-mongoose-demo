import {Request, Response, NextFunction} from 'express';
import ServiceFacade from './../../services';

export default class RestRequestData {
  constructor(
    public req: Request,
    public res: Response,
    public next: NextFunction
  ) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  public getServices(): ServiceFacade {
    return this.res.app.locals.services;
  }

  public getUserId(): string {
    return this.res.app.locals.user.id;
  }
}
