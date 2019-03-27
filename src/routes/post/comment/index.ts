import * as express from 'express';

import createController from './../../../../core/rest/controller/createController';

import CreatePostController from './controllers/CreateCommentController';
import CreateCommentValidator from './validation/CreateCommentValidator';
import CreateCommentAdvancedValidator from './validation/CreateCommentAdvancedValidator';

const router = express.Router({});

router.post('/:postId/comments',
  CreateCommentValidator.validate(),
  createController(CreatePostController, CreateCommentAdvancedValidator)
);

export default router;
