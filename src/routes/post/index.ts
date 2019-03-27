import * as express from 'express';

import createController from './../../../core/rest/controller/createController';
import TokenDecoder from './../../../core/rest/middleware/TokenDecoder';

import CreatePostController from './controllers/CreatePostController';
import CreatePostValidator from './validation/CreatePostValidator';

import GetPostController from './controllers/GetPostController';
import GetPostValidator from './validation/GetPostValidator';

const router = express.Router({});

router.use(TokenDecoder.decode);

router.post('/',
  CreatePostValidator.validate(),
  createController(CreatePostController)
);

router.get('/:postId',
  GetPostValidator.validate(),
  createController(GetPostController)
);

export default router;
