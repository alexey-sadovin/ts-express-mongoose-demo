import * as express from 'express';

import commentRoutes from './comment';

import createController from './../../../core/rest/controller/createController';
import TokenDecoder from './../../../core/rest/middleware/TokenDecoder';

import CreatePostController from './controllers/CreatePostController';
import CreatePostValidator from './validation/CreatePostValidator';

import GetPostController from './controllers/GetPostController';
import GetPostValidator from './validation/GetPostValidator';

import UpdatePostController from './controllers/UpdatePostController';
import UpdatePostValidator from './validation/update/UpdatePostValidator';
import UpdatePostAdvancedValidator from './validation/update/UpdatePostAdvancedValidator';

const router = express.Router({});

router.use(TokenDecoder.decode);
router.use('/', commentRoutes);

router.post('/',
  CreatePostValidator.validate(),
  createController(CreatePostController)
);

router.get('/:postId',
  GetPostValidator.validate(),
  createController(GetPostController)
);

router.put('/:postId',
  UpdatePostValidator.validate(),
  createController(UpdatePostController, UpdatePostAdvancedValidator)
);

export default router;
