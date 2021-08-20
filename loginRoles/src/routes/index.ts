import {Router} from 'express';
import auth from './auth';
import user from './user';

// constante con las rutas
const routes = Router();

routes.use('/auth',auth);// prefijos
routes.use('/users',user);

export default routes;