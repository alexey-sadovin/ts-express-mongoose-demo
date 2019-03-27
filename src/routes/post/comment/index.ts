import * as express from 'express';

import createController from './../../../../core/rest/controller/createController';

import CreatePostController from './controllers/CreateCommentController';
import CreateCommentValidator from './validation/create/CreateCommentValidator';
import CreateCommentAdvancedValidator from './validation/create/CreateCommentAdvancedValidator';

import GetCommentController from './controllers/GetCommentController';
import GetCommentValidator from './validation/get/GetCommentValidator';
import GetCommentAdvancedValidator from './validation/get/GetCommentAdvancedValidator';

import UpdateCommentController from './controllers/UpdateCommentController';
import UpdateCommentValidator from './validation/update/UpdateCommentValidator';
import UpdateCommentAdvancedValidator from './validation/update/UpdateCommentAdvancedValidator';

const router = express.Router({});

router.post('/:postId/comments',
  CreateCommentValidator.validate(),
  createController(CreatePostController, CreateCommentAdvancedValidator)
);

router.get('/:postId/comments/:commentId',
  GetCommentValidator.validate(),
  createController(GetCommentController, GetCommentAdvancedValidator)
);

router.put('/:postId/comments/:commentId',
  UpdateCommentValidator.validate(),
  createController(UpdateCommentController, UpdateCommentAdvancedValidator)
);

export default router;
