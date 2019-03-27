import * as express from 'express';

import authRoutes from './auth';
import userRoutes from './user';
import postRoutes from './post';

const router = express.Router({});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);

export default router;
