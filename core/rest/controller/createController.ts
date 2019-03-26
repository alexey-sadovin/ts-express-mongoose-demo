import {Request, Response, NextFunction} from 'express';

import RestRequestData from './RestRequestData';
import {RestRouteControllerClass} from './RestRouteController';
import {RestAdvancedValidatorClass} from './RestAdvancedValidator';

type ControllerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export default function createController(
  controllerClass: RestRouteControllerClass,
  validatorClass?: RestAdvancedValidatorClass
): ControllerMiddleware {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestData = new RestRequestData(req, res, next);
    return new controllerClass(requestData, validatorClass)
      .handleRequest();
  };
}
