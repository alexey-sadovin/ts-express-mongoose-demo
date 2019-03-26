import {Request, Response, NextFunction} from 'express';
import {Answer, AnswerData, CustomErrorFactory} from './../answer';

export default {
  handleNoEndpointError(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    Answer
      .for(res, next)
      .notFound(
        CustomErrorFactory.code(Answer.CODES.endpointNotFound));
  },

  handleApplicationError(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (error instanceof AnswerData) {
      return next();
    }

    Answer
      .for(res, next)
      .internal(error);

    next();
  }
};
