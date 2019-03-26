import {Response, NextFunction} from 'express';
import AnswerData from './AnswerData';
import CustomErrorsFactory from './CustomErrorsFactory';
import AnswerCodes from './AnswerCodes';

export default class Answer {
  constructor(public res: Response, public next: NextFunction) {
    this.res = res;
    this.next = next;
  }

  static CODES = AnswerCodes;

  static for(res: Response, next: NextFunction): Answer {
    return new Answer(res, next);
  }

  static custom(): CustomErrorsFactory {
    return CustomErrorsFactory;
  }

  private addAnswer(status: Number, data?: any): void {
    const answerData: AnswerData = new AnswerData(status, data);

    this.res.locals.answer = answerData;
    if (this.next) {
      this.next(status >= 400 ? answerData : undefined);
    }
  }

  private addError(code: Number, errors: any): void {
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

  public ok(data: any): void {
    this.addAnswer(200, data);
  }

  public created(data: any): void {
    this.addAnswer(201, data);
  }

  public noContent(): void {
    this.addAnswer(204);
  }

  public badRequest(data: any): void {
    this.addError(400, data);
  }

  public notAuthorized(data: any): void {
    this.addError(401, data);
  }

  public forbidden(data: any): void {
    this.addError(403, data);
  }

  public notFound(data: any): void {
    this.addError(404, data);
  }

  public internal(data: Error|any): void {
    this.addError(500, data);
  }
}
