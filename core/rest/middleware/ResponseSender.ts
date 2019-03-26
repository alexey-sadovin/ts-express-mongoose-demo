import {Request, Response, NextFunction} from 'express';
import {Answer, AnswerData, CustomErrorFactory} from './../answer';

const NO_ANSWER_CODE: string = 'NO_ANSWER_PROVIDED';

class ResponseSender {
  constructor(
    private readonly req: Request,
    private readonly res: Response,
    private readonly next: NextFunction
  ) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  private sendResponse(): void {
    const answer = Answer.extractAnswer(this.res);

    if (answer.data instanceof Error) {
      this.sendInternalError(answer);
    } else {
      this.sendRegularResponse(answer);
    }
  }

  private sendRegularResponse(answer: AnswerData): void {
    this.res.status(answer.status || 200).json(answer.data);
  }

  private sendInternalError(answer: AnswerData): void {
    this.res
      .status(500)
      .json(
        Object.assign(
          CustomErrorFactory.code(Answer.CODES.internal),
          {
            name: answer.data.name,
            message: answer.data.message,
            stack: answer.data.stack
          }
        )
      );
  }

  public trySendingAnswer(final: Boolean): void {
    if (Answer.hasAnswer(this.res)) {
      return this.sendResponse();
    }

    if (!final) {
      return this.next();
    }

    Answer
      .for(this.res, this.next)
      .internal(CustomErrorFactory.code(NO_ANSWER_CODE));
  }
}

export default {
  firstTry(req: Request, res: Response, next: NextFunction): void {
    new ResponseSender(req, res, next).trySendingAnswer(false);
  },

  finalTry(req: Request, res: Response, next: NextFunction): void {
    new ResponseSender(req, res, next).trySendingAnswer(true);
  }
};
