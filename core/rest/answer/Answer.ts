import {Response, NextFunction} from 'express';
import AnswerData from './AnswerData';

export default class Answer {
  constructor(public res: Response, public next: NextFunction) {
    this.res = res;
    this.next = next;
  }

  static for(res: Response, next: NextFunction): Answer {
    return new Answer(res, next);
  }

  private addAnswer(status: Number, data?: any): void {
    const answerData: AnswerData = new AnswerData(status, data);

    this.res.locals.answer = answerData;
    if (this.next) {
      this.next(status >= 400 ? answerData : undefined);
    }
  }

  private addError(code: Number, errors: any) {
    let data;

    if (errors !== undefined) {
      data = errors instanceof Error ?
        errors :
        {
          errors: !Array.isArray(errors) ? [errors] : errors
        };
    }

    this.addAnswer(code, data);
  }

  ok(data: any) {
    this.addAnswer(200, data);
  }

  created(data: any) {
    this.addAnswer(201, data);
  }

  noContent() {
    this.addAnswer(204);
  }

  badRequest(data: any) {
    this.addError(400, data);
  }

  notAuthorized(data: any) {
    this.addError(401, data);
  }

  forbidden(data: any) {
    this.addError(403, data);
  }

  notFound(data: any) {
    this.addError(404, data);
  }

  internal(data: Error|any) {
    this.addError(500, data);
  }
}
