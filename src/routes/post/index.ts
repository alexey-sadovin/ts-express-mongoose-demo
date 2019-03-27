import * as express from 'express';

import createController from './../../../core/rest/controller/createController';
import TokenDecoder from './../../../core/rest/middleware/TokenDecoder';

import CreatePostController from './controllers/CreatePostController';
import CreatePostValidator from './validation/CreatePostValidator';

const router = express.Router({});

router.use(TokenDecoder.decode);

router.post('/',
  CreatePostValidator.validate(),
  createController(CreatePostController)
);

export default router;
