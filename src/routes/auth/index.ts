import * as express from 'express';

import createController from './../../../core/rest/controller/createController';
import RegistrationController from './controllers/RegistrationController';
import RegistrationValidator from './validation/RegistrationValidator';
import RegistrationAdvancedValidator from './validation/RegistrationAdvancedValidator';

const router = express.Router({});

router.post('/register',
  RegistrationValidator.validate(),
  createController(RegistrationController, RegistrationAdvancedValidator)
);

export default router;
