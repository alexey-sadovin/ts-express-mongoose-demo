import {Request, Response, NextFunction} from 'express';

import RestRouteController from './RestRouteController';
import RestAdvancedValidator from './RestAdvancedValidator';
import RestRequestData from './RestRequestData';

export default function createController(
  RestRouteControllerClass: typeof RestRouteController,
  RestAdvancedValidatorClass?: typeof RestAdvancedValidator
): Function {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestData = new RestRequestData(req, res, next);
    return new RestRouteControllerClass(requestData, RestAdvancedValidatorClass)
      .handleRequest();
  };
}
