import * as express from 'express';

import createController from './../../../core/rest/controller/createController';
import TokenDecoder from './../../../core/rest/middleware/TokenDecoder';

import UserController from './controllers/UserController';

const router = express.Router({});

router.get('/',
  TokenDecoder.decode,
  createController(UserController)
);

export default router;
