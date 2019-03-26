import * as express from 'express';

import createController from './../../../core/rest/controller/createController';
import RegisterController from './controllers/RegisterController';

const router = express.Router({});

router.post('/register', createController(RegisterController));

export default router;
