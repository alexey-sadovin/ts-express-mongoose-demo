import * as express from 'express';

import createController from './../../../core/rest/controller/createController';

import RegistrationController from './controllers/RegistrationController';
import RegistrationValidator from './validation/registration/RegistrationValidator';
import RegistrationAdvancedValidator from './validation/registration/RegistrationAdvancedValidator';

import LoginController from './controllers/LoginController';
import LoginValidator from './validation/LoginValidator';

const router = express.Router({});

router.post('/register',
  RegistrationValidator.validate(),
  createController(RegistrationController, RegistrationAdvancedValidator)
);

router.post('/login',
  LoginValidator.validate(),
  createController(LoginController)
);

export default router;
