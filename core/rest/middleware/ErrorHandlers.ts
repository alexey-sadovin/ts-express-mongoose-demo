import {Request, Response, NextFunction} from 'express';

import Answer from './../answer';
import AnswerData from './../answer/AnswerData';

function isBodyParserError(error: Error): boolean {
  return error instanceof Error && Number.isInteger(error.statusCode);
}

export default {
  handleNoEndpointError(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    Answer
      .for(res, next)
      .notFound(
        Answer
          .custom()
          .code(Answer.CODES.endpointNotFound)
      );
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

    if (isBodyParserError(error)) {
      Answer
        .for(res, next)
        .badRequest(
          Answer
            .custom()
            .notParsed(error.message)
        );
    } else {
      Answer
        .for(res, next)
        .internal(error);
    }

    next();
  }
};
