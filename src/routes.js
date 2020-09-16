import { Router } from 'express';

import { AuthController, UserController } from './controllers';

const routes = new Router();

routes.post('/signup', UserController.store);

routes.post('/login', AuthController.store);

export default routes;
