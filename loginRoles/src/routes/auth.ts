import { Router } from "express";
import AuthController from '../controller/authController';
import { checkJwt } from "../middleware/jwt";

const routes = Router();

//login
routes.post('/login',AuthController.login);

//cambio de password
routes.post('/change-password',[checkJwt],AuthController.changePassword);

export default routes;