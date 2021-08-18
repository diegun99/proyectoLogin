import { Router } from "express";
import AuthController from '../controller/authController';

const routes = Router();

//login
routes.post('/login',AuthController.login);

export default routes;