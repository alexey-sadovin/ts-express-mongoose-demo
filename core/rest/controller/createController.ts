import {Request, Response, NextFunction} from 'express';

import RestRequestData from './RestRequestData';
import {RestRouteControllerClass} from './RestRouteController';
import {RestAdvancedValidatorClass} from './RestAdvancedValidator';

export default function createController(
  controllerClass: RestRouteControllerClass,
  validatorClass?: RestAdvancedValidatorClass
): Function {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestData = new RestRequestData(req, res, next);
    return new controllerClass(requestData, validatorClass)
      .handleRequest();
  };
}
