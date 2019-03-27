import {Request, Response, NextFunction} from 'express';

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
}
